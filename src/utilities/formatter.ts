import { benchmarkFields } from 'src/constants';
import { ArgsType } from 'src/ui';

export const benchmarkResultToObject: BenchmarkResultToObjectType = (
	{ visibleFields },
	benchmark,
) => {
	if (!benchmark) {
		return;
	}
	const benchmarkRows = benchmark.split('\n');

	return visibleFields?.reduce((prev, [index, field]) => {
		if (benchmarkRows[index].startsWith(field)) {
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
	if (typeof fields === 'string') {
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

export const benchmarkTableObject: BenchmarkTableObjectType = (
	{ visibleFields: fields },
	benchmarks = {},
) => {
	const columns = Object.keys(benchmarks);
	if (!benchmarks || !columns?.length) return {};

	return fields.reduce((prev, [_, field]) => {
		return {
			...prev,
			[field]: columns.reduce((prev, column) => {
				return { ...prev, [column]: benchmarks[column][field] };
			}, {}),
		};
	}, {});
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type BenchmarkResultToObjectType = (
	args: ArgsType,
	benchmark?: string | void,
) => Record<any, any> | void;

type ResolveVisibleFieldsEntriesType = (fields?: number[] | string) => [number, string][];

type BenchmarkTableObjectType = (
	args: ArgsType,
	benchmarks?: Record<any, any> | void,
) => Record<any, any>;
