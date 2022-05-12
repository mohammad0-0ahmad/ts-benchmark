import { benchmarkFields, storage, tableColors, TableStaticColumns } from 'src/constants';
import { ArgsType } from 'src/ui';
import { Table } from 'console-table-printer';
import { ColumnOptionsRaw } from 'console-table-printer/dist/src/models/external-table';

export const benchmarkResultToObject: BenchmarkResultToObjectType = (
	{ visibleFields },
	benchmark,
) => {
	if (!benchmark) {
		return;
	}

	const benchmarkRows = benchmark.split('\n');
	return visibleFields?.reduce((prev, [index, field]) => {
		if (benchmarkRows[index]?.startsWith(field)) {
			const lineValue = benchmarkRows[index].match(/\d.*/)?.[0];
			return lineValue ? { ...prev, [field]: lineValue } : prev;
		}
		return prev;
	}, {});
};

/**
 *
 * @param fields
 * @returns
 */
export const resolveVisibleFieldsEntries: ResolveVisibleFieldsEntriesType = (fields) => {
	if (!fields || typeof fields === 'string') {
		return benchmarkFields.map<[number, string]>((field, index) => [index, field]);
	}

	return fields?.reduce((prev: any, field) => {
		const index = field - 1;
		try {
			if (!benchmarkFields?.[index]) {
				return prev;
			}
			return [...prev, [index, benchmarkFields?.[index]]];
		} catch (error) {
			return prev;
		}
	}, []);
};

export const resolveBenchmarkTable: ResolveBenchmarkTableType = (
	{ visibleFields: fields },
	benchmarks = {},
) => {
	const columnsStrings = Object.keys(benchmarks);
	if (!benchmarks || !columnsStrings?.length) {
		return;
	}
	const columns: ColumnOptionsRaw[] =
		storage?.tableColumns ||
		['field', ...columnsStrings].map((column) => ({
			name: column,
			alignment: 'left',
			color: tableColors?.[column as TableStaticColumns] || 'green',
			title: column.charAt(0).toUpperCase() + column.slice(1),
		}));
	const rows = fields.reduce((prev, [_, field]) => {
		return [
			...prev,
			{
				field,
				...columnsStrings.reduce((prev, column) => {
					return { ...prev, [column]: benchmarks[column][field] };
				}, {}),
			},
		];
	}, [] as any[]);
	return new Table({ columns, rows, title: '<{ Benchmark result }>' });
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type BenchmarkResultToObjectType = (
	args: ArgsType,
	benchmark?: string | void,
) => Record<any, any> | void;

type ResolveVisibleFieldsEntriesType = (fields?: number[] | string) => [number, string][];

type ResolveBenchmarkTableType = (
	args: ArgsType,
	benchmarks?: Record<any, any> | void,
) => Table | undefined;
