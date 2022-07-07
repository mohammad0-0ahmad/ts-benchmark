import { watch as watcher } from 'chokidar';
import userInterface from './ui';
import { resolveVisibleFieldsEntries } from './utilities/formatter';
import { print } from './utilities/logger';
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
	/*                                   Output                                   */
	/* -------------------------------------------------------------------------- */
	if (watch) {
		const watchingMsg = `\n${$0}: I am looking for changes... (0_0)\n`;
		console.log(watchingMsg);
		watcher(watch, { persistent: true }).on('change', async () => {
			await print(args);
			console.log(watchingMsg);
		});
	} else {
		print(args);
	}
}
