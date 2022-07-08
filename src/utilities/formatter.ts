import {
	benchmarkFields,
	storage,
	tableFieldsColors,
	TableStaticColumns,
	unicodeSymbols,
} from 'src/constants';
import { ArgsType } from 'src/ui';
import {
	ColumnOptionsRaw,
	ComplexOptions,
} from 'console-table-printer/dist/src/models/external-table';
import chalk from 'chalk';

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
		['field', ...columnKeys].map((column) => ({
			name: column,
			alignment: 'left',
			color: tableFieldsColors?.[column as TableStaticColumns] || 'green',
			title: column.charAt(0).toUpperCase() + column.slice(1),
		}));

	const rejectedFields: string[] = [];
	const rejectedFieldsDetails: any[] = [];

	const rows: TableRowsDataType = Object.entries(fields).reduce((prev, [_, { label, max }]) => {
		const row = {
			field: label,
			...columnKeys.reduce((prev, column) => {
				let benchmarkValue = benchmarks?.[column]?.[label] as string;

				const shouldBeMarkedAsRejectedResult =
					markRejectedValue && column === 'current' && max
						? parseFloat(benchmarkValue) < max
							? false
							: true
						: false;

				if (shouldBeMarkedAsRejectedResult) {
					benchmarkValue = chalk.red(benchmarkValue);
					rejectedFields.push(label);
					rejectedFieldsDetails.push({ field: label, current: benchmarkValue, maximum: max });
				}

				return {
					...prev,
					[column]: benchmarkValue,
				};
			}, {}),
		};

		return [...prev, row];
	}, [] as any);

	return {
		columns,
		rows,
		computedColumns: [
			{
				name: 'Status',
				function: ({ field }: Record<TableStaticColumns, string>) => {
					return rejectedFields.includes(field)
						? unicodeSymbols.crossMark
						: unicodeSymbols.checkMark;
				},
				alignment: 'center',
				maxLen: 3,
			},
		],
		rejectedFieldsDetails,
	};
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
			rows: TableRowsDataType;
			rejectedFieldsDetails: { field: string; current: string; maximum: string }[];
	  } & Omit<ComplexOptions, 'rows,columns'>)
	| undefined;

type TableRowsDataType = { [K in TableStaticColumns]: string }[];

export type FieldsConfigType = Record<number, { label: string; max?: number }>;
