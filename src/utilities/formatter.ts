import { benchmarkFields } from 'src/constants';

export const benchmarkResultToObject: BenchmarkResultToObjectType = (visibleFields, benchmark) => {
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
	if (!fields || fields === 'false' || fields === 'true') {
		return benchmarkFields.map<[number, string]>((field, index) => [index, field]);
	}

	return fields.split(fields.includes(',') ? ',' : ' ')?.reduce((prev: any, indexString) => {
		try {
			const index = parseInt(indexString) - 1;
			if (!benchmarkFields?.[index]) {
				throw new Error();
			}
			return [...prev, [index, benchmarkFields?.[index]]];
		} catch (error) {
			return prev;
		}
	}, []);
};

export const benchmarkTableObject: BenchmarkTableObjectType = (fields, benchmarks = {}) => {
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
	visibleFields: [number, string][],
	benchmark?: string | void,
) => Record<any, any> | void;

type ResolveVisibleFieldsEntriesType = (fields?: string) => [number, string][];

type BenchmarkTableObjectType = (
	fields: [number, string][],
	benchmarks?: Record<any, any> | void,
) => Record<any, any>;
