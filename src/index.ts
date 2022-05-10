import { watch as watcher } from 'chokidar';
import { storage } from './constants';
import userInterface from './ui';
import { benchmark } from './utilities/benchmark';
import {
	benchmarkResultToObject,
	benchmarkTableObject,
	resolveVisibleFieldsEntries,
} from './utilities/formatter';
import { prepareStorage } from './utilities/storageManager';

const args = userInterface();
const { $0, save, watch, branch, fields, initial } = args;
main();

async function main() {
	/* -------------------------------------------------------------------------- */
	/*                                Checking args                               */
	/* -------------------------------------------------------------------------- */
	if (save && !watch) {
		console.warn(`${$0}: "save" option is not available when watch mode is inactive!`);
	}
	if (initial && !watch) {
		console.warn(`${$0}: "initial" option is not available when watch mode is inactive!`);
	}

	/* -------------------------------------------------------------------------- */
	/*                                  Preparing                                 */
	/* -------------------------------------------------------------------------- */
	const visibleFields = resolveVisibleFieldsEntries(fields);
	await prepareStorage(args);

	/* -------------------------------------------------------------------------- */
	/*                                  print FN                                  */
	/* -------------------------------------------------------------------------- */
	const print = async () => {
		console.log(`${$0}: Start benchmarking...\n`);
		const current = benchmarkResultToObject(visibleFields, await benchmark(args)) || {};
		const output = benchmarkTableObject(visibleFields, {
			...(storage?.branch ? { [branch as unknown as string]: storage.branch } : {}),
			...(storage?.initial ? { initial: storage.initial } : {}),
			...(storage?.previous ? { previous: storage.previous } : {}),
			current,
		});
		console.table(output);
		const shouldSaveInitialBenchmark = initial && !storage.initial;
		if (save && shouldSaveInitialBenchmark) {
			storage.previous = current;
		}
		if (shouldSaveInitialBenchmark) {
			storage.initial = current;
		}
	};

	/* -------------------------------------------------------------------------- */
	/*                                   Output                                   */
	/* -------------------------------------------------------------------------- */
	if (watch) {
		watcher(watch, { persistent: true }).on('change', print);
	} else {
		print();
	}
}
