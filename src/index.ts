import { watch as watcher } from 'chokidar';
import { storage } from './constants';
import userInterface from './ui';
import { benchmark } from './utilities/benchmark';
import {
	benchmarkResultToObject,
	resolveBenchmarkTable,
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
	args.visibleFields = visibleFields;

	if (initial || branch) {
		await prepareStorage(args);
	}

	/* -------------------------------------------------------------------------- */
	/*                                  print FN                                  */
	/* -------------------------------------------------------------------------- */
	const print = async () => {
		console.log(`${$0}: Start benchmarking...\n`);
		const current = benchmarkResultToObject(args, await benchmark(args)) || {};
		const table = resolveBenchmarkTable(args, {
			...(storage?.branch ? { [branch as unknown as string]: storage.branch } : {}),
			...(storage?.initial ? { initial: storage.initial } : {}),
			...(storage?.previous ? { previous: storage.previous } : {}),
			current,
		});
		table?.printTable();
		if (save) {
			storage.previous = current;
		}
	};

	/* -------------------------------------------------------------------------- */
	/*                                   Output                                   */
	/* -------------------------------------------------------------------------- */
	if (watch) {
		const watchingMsg = `\n${$0}: I am looking for changes... (0_0)\n`;
		console.log(watchingMsg);
		watcher(watch, { persistent: true }).on('change', async () => {
			await print();
			console.log(watchingMsg);
		});
	} else {
		print();
	}
}
