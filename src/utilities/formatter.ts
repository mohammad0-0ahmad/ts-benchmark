import {
	benchmarkFields,
	githubSymbols,
	storage,
	tableColorMap,
	tableFieldsColors,
	TableStaticColumns,
	terminalSymbols,
} from 'src/constants';
import { ArgsType } from 'src/ui';
import {
	ColumnOptionsRaw,
	ComplexOptions,
} from 'console-table-printer/dist/src/models/external-table';
import chalk from 'chalk';
import { SummaryTableRow } from '@actions/core/lib/summary';

export const benchmarkResultToObject: BenchmarkResultToObjectType = (
	{ visibleFields },
	benchmark,
) => {
	if (!benchmark) {
		return;
	}

	const benchmarkRows = benchmark.split('\n');
	return Object.entries(visibleFields)?.reduce((prev, [indexString, { label }]) => {
		const index = parseInt(indexString);
		if (benchmarkRows[index]?.startsWith(label)) {
			const lineValue = benchmarkRows[index].match(/\d.*/)?.[0];
			return lineValue ? { ...prev, [label]: lineValue } : prev;
		}
		return prev;
	}, {});
};

export const resolveVisibleFieldsEntries: ResolveVisibleFieldsEntriesType = (fields) => {
	if (!fields || typeof fields === 'string') {
		return benchmarkFields.reduce<FieldsConfigType>(
			(config: FieldsConfigType, field, index) => ({ ...config, [index]: { label: field } }),
			{},
		);
	}

	return fields?.reduce((config: FieldsConfigType, fieldConfig) => {
		const [field, max] =
			typeof fieldConfig === 'number'
				? [fieldConfig, undefined]
				: fieldConfig.split('/').map((value) => parseInt(value));

		const index = (field as any) - 1;

		try {
			if (!benchmarkFields?.[index]) {
				return config;
			}
			return { ...config, [index]: { label: benchmarkFields?.[index], max } };
		} catch (error) {
			return config;
		}
	}, {});
};

export const resolveBenchmarkTableData: ResolveBenchmarkTableDataType = (
	{ visibleFields: fields },
	benchmarks,
	markRejectedValue = true,
) => {
	const columnKeys = Object.keys(benchmarks) as unknown as Exclude<TableStaticColumns, 'field'>[];
	if (!benchmarks || !columnKeys?.length) {
		return;
	}

	const columns: ColumnOptionsRaw[] =
		storage?.tableColumns ||
		['field', ...columnKeys].map((column) => {
			const title = column === 'branch' ? (storage.branchName as string) : column;
			return {
				name: column,
				alignment: 'left',
				color: tableFieldsColors?.[column as TableStaticColumns],
				title: title.charAt(0).toUpperCase() + title.slice(1),
			};
		});

	let hasBenchmarkFailed = false;

	const rows: TableRowDataType[] = Object.entries(fields).reduce(
		(prev, [_, { label: field, max }]) => {
			let succeed = true;
			let failureDetails = '';

			const row = {
				field,
				...columnKeys.reduce((prev, column) => {
					let benchmarkValue = benchmarks?.[column]?.[field] as string;

					const hasSucceed =
						markRejectedValue && column === 'current' && max
							? parseFloat(benchmarkValue) < max
								? true
								: false
							: true;

					if (!hasSucceed) {
						hasBenchmarkFailed = true;
						succeed = false;
						failureDetails = `Current benchmark result ${benchmarkValue} > ${max}`;
					}

					return {
						...prev,
						[column]: benchmarkValue,
					};
				}, {}),
			};

			return [
				...prev,
				{
					...row,
					succeed,
					failureDetails,
				},
			];
		},
		[] as any,
	);

	return {
		colorMap: tableColorMap,
		columns: [
			...columns,
			...(hasBenchmarkFailed
				? ([
						{
							name: 'succeed',
							color: 'green',
							alignment: 'center',
							title: 'Succeed',
						},
						{
							name: 'failureDetails',
							alignment: 'left',
							title: 'Failure details',
						},
				  ] as ColumnOptionsRaw[])
				: []),
		],
		rows: hasBenchmarkFailed ? rows : rows.map(({ succeed, failureDetails, ...rest }) => rest),
		hasBenchmarkFailed,
	};
};

export const restyleTerminalTable: RestyleTerminalTableType = (data) => {
	if (!data) {
		return data;
	}
	const result = {
		...data,
		rows: data?.rows.map(({ succeed, current, ...rest }) => ({
			...rest,
			current: succeed === false ? chalk.red(current) : current,
			...(succeed === undefined
				? {}
				: {
						succeed: succeed
							? chalk.green(terminalSymbols.checkMark)
							: chalk.red(terminalSymbols.crossMark),
				  }),
		})),
	};

	return result;
};

export const resolveGithubTableData: ResolveGithubTableDataType = (data) => {
	if (!data) {
		return [];
	}
	const { columns, rows } = data;
	const header = columns.map(({ title, name }) => ({ data: title || name, header: true }));
	const body = rows.map((row) =>
		Object.values(row).map((item) =>
			typeof item === 'boolean' ? (item ? githubSymbols.checkMark : githubSymbols.crossMark) : item,
		),
	);

	return [header, ...body];
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type BenchmarkResultToObjectType = (
	args: ArgsType,
	benchmark?: string | void,
) => Record<string, string> | void;

type ResolveVisibleFieldsEntriesType = (fields?: (number | string)[]) => FieldsConfigType;

type ResolveBenchmarkTableDataType = (
	args: ArgsType,
	benchmarks: Partial<Record<Exclude<TableStaticColumns, 'field'>, Record<string, string>>>,
	markRejectedValue?: boolean,
) =>
	| ({
			columns: ColumnOptionsRaw[];
			rows: TableRowDataType[];
			hasBenchmarkFailed: boolean;
	  } & Omit<ComplexOptions, 'rows' | 'columns'>)
	| undefined;

type TableRowDataType = Partial<
	Record<TableStaticColumns | 'failureDetails', string> & Record<'succeed', boolean>
>;

export type FieldsConfigType = Record<number, { label: string; max?: number }>;

type RestyleTerminalTableType = (data: ReturnType<ResolveBenchmarkTableDataType>) =>
	| (Omit<Exclude<ReturnType<ResolveBenchmarkTableDataType>, undefined>, 'rows'> & {
			rows: (Omit<TableRowDataType, 'succeed'> & Partial<Record<'succeed', string>>)[];
	  })
	| undefined;

type ResolveGithubTableDataType = (
	data: ReturnType<ResolveBenchmarkTableDataType>,
) => SummaryTableRow[];
