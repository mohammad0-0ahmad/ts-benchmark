import { ArgsType } from './ui';
import { prepareStorage } from './utilities/storageManager';
import { watch as watcher } from 'chokidar';
import { print } from './utilities/logger';

export const main = async (args: ArgsType) => {
	const { $0, watch, branch, initial } = args;
	if (initial || branch) {
		await prepareStorage(args);
	}
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
};
