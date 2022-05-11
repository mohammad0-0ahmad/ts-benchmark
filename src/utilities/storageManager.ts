import { storage } from 'src/constants';
import { ArgsType } from 'src/ui';
import { benchmark } from './benchmark';
import { benchmarkResultToObject } from './formatter';
import run from './run';

export const prepareStorage: PrepareStorageType = async (args) => {
	const { $0, path, branch, initial } = args;
	console.log(`${$0}: Preparing...`);
	console.log(
		`${$0}: Please do not make any changes in your workspace until preparing process is done.`,
	);
	if (!path) {
		return;
	}

	storage.currentBranchName = (await run('git branch --show-current')).stdout || '';

	if (initial) {
		storage.initial = benchmarkResultToObject(args, await benchmark(args)) || {};
	}

	if (branch) {
		storage.branchName = branch;
		await run('git add .');
		const shouldCreateTempCommit =
			Boolean((await run('git diff --name-only --cached')) || false) &&
			Boolean((await run(`git branch --list ${storage.branchName}`)) || false);
		if (shouldCreateTempCommit) {
			await run(`git commit -m ${$0}-temp-commit`);
		}
		await run(`git checkout ${storage.branchName}`);
		storage.branch = benchmarkResultToObject(args, await benchmark(args)) || {};
		await run(`git checkout ${storage.currentBranchName}`);
		if (shouldCreateTempCommit) {
			await run('git reset HEAD~');
		}
	}
	console.log(`${$0}: Preparing process done.`);
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type PrepareStorageType = (args: ArgsType) => Promise<void>;
