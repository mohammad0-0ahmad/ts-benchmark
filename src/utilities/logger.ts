import { storage } from 'src/constants';
import { ArgsType } from 'src/ui';
import { benchmark } from './benchmark';
import { benchmarkResultToObject, resolveBenchmarkTable } from './formatter';

export const print = async (args: ArgsType) => {
	const { save, $0, branch } = args;
	console.log(`${$0}: Start benchmarking...\n`);
	const current = benchmarkResultToObject(args, await benchmark(args));
	const table = resolveBenchmarkTable(args, {
		...(storage?.branch ? { [branch as unknown as string]: storage.branch } : {}),
		...(storage?.initial ? { initial: storage.initial } : {}),
		...(storage?.previous ? { previous: storage.previous } : {}),
		...(current ? { current } : {}),
	});
	table?.printTable();
	if (save) {
		storage.previous = current;
	}
};
