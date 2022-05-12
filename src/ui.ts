import yargs from 'yargs';

const userInterface: UserInterfaceType = () => {
	return yargs
		.scriptName('ts-benchmark')
		.usage(
			'\nUsage:\n $0 -ts path/to/targeted/package/types -p path/to/test/project/that/use/the/target/package',
		)
		.option('path', {
			alias: 'p',
			describe: 'A relative path to project that will be benchmarked.',
			type: 'string',
			default: './',
		})
		.option('watch', {
			alias: 'w',
			describe:
				'A relative path to a directory or a file that trigger benchmark process on any changes.',
			type: 'string',
		})
		.option('branch', {
			alias: 'b',
			describe:
				'Another git branch name to be benchmarked and compared with the current branch.',
			type: 'string',
		})
		.option('save', {
			alias: 's',
			describe: 'To save and show the previous benchmark result.',
			type: 'boolean',
			default: false,
		})
		.option('initial', {
			alias: 'i',
			describe: 'To save and show the initial benchmark result.',
			type: 'boolean',
			default: false,
		})
		.option('fields', {
			alias: 'f',
			describe:
				'To pick and show specific fields of benchmark result by its index numbers.\n Check how this option value format: https://www.npmjs.com/package/ts-benchmark#fields',
			type: 'array',
		})
		.wrap(Math.min(100, yargs.terminalWidth()))
		.help().argv as unknown as ArgsType;
};

export default userInterface;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type UserInterfaceType = () => ArgsType;

export type ArgsType = {
	$0: string;
	path: string;
	visibleFields: [number, string][];
	save?: boolean;
	watch?: string;
	branch?: string;
	fields?: string;
	initial?: boolean;
};
