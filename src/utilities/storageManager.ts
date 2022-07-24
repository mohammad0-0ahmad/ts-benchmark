import { storage } from 'src/constants';
import { ArgsType } from 'src/ui';
import { benchmark } from './benchmark';
import { benchmarkResultToObject } from './formatter';
import run from './run';

export const prepareStorage: PrepareStorageType = async (args) => {
	const { $0, path, branch, initial, github, target } = args;
	console.log(`${$0}: Preparing...`);
	console.log(
		`${$0}: Please do not make any changes in your workspace until preparing process is done.`,
	);
	if (!path) {
		return;
	}

	// Store current branch name or branch id.
	storage.currentBranchName = (
		await run(!github ? 'git branch --show-current' : 'git rev-parse --short HEAD')
	).stdout.trim();

	if (initial) {
		storage.initial = benchmarkResultToObject(args, await benchmark(args)) || {};
	}

	storage.branchName = branch ? branch.trim() : undefined;

	if (storage.branchName && storage.branchName !== storage.currentBranchName) {
		storage.branch = await benchmarkBranch(args, storage.branchName);
	}

	if (
		github &&
		target &&
		process.env?.GITHUB_BASE_REF &&
		process.env?.GITHUB_BASE_REF !== storage.branchName
	) {
		storage.targetName = process.env.GITHUB_BASE_REF;
		storage.target = await benchmarkBranch(args, storage.targetName);
	}

	console.log(`${$0}: Preparing process done :)`);
};

const benchmarkBranch: BenchmarkBranchType = async (args, branchName) => {
	const { $0, github } = args;
	if (github) {
		await run('git config --global user.email "test@ts-benchmark.com"');
		await run('git config --global user.name "ts-benchmark"');
	}
	await run('git add .');
	const shouldCreateTempCommit = github
		? false
		: Boolean((await run('git diff --name-only --cached')) || false) &&
		  Boolean((await run(`git branch --list ${storage.branchName}`)) || false);

	if (shouldCreateTempCommit) {
		await run(`git commit -m ${$0}-temp-commit`);
	}

	await run(`git checkout ${branchName}`);
	const result = benchmarkResultToObject(args, await benchmark(args)) || {};
	await run(`git checkout ${storage.currentBranchName}`);

	//delete temp commit.
	const latestCommitMessage =
		shouldCreateTempCommit && (await run('git log -1 --pretty=%B')).stdout.trim();
	if (shouldCreateTempCommit && latestCommitMessage === `${$0}-temp-commit`) {
		await run('git reset HEAD~');
	}

	return result;
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type PrepareStorageType = (args: ArgsType) => Promise<void>;

type BenchmarkBranchType = (args: ArgsType, branchName: string) => Promise<Record<string, string>>;
