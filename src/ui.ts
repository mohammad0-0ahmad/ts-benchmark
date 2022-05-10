import yargs from 'yargs';

const userInterface: UserInterfaceType = () => {
	return yargs
		.scriptName('ts-benchmark')
		.usage(
			'\nUsage:\n $0 -ts path/to/targeted/package/types -p path/to/test/project/that/use/the/target/package',
		)
		.option('path', {
			alias: 'p',
			describe:
				'A relative path to test project that depend on the package which will be used to benchmark the package types performance.',
			type: 'string',
			demandOption: true,
		})
		.option('watch', {
			alias: 'w',
			describe: 'A relative path to package types that will be watched.',
			type: 'string',
		})
		.option('branch', {
			alias: 'b',
			describe:
				'Another git branch to be benchmarked to be able to compare with the current branch.',
			type: 'string',
		})
		.option('save', {
			alias: 's',
			describe: 'To save and show the previous benchmark result.',
			type: 'boolean',
		})
		.option('initial', {
			alias: 'i',
			describe: 'To save and show the initial benchmark result.',
			type: 'boolean',
		})
		.option('fields', {
			alias: 'f',
			describe:
				'Uses to pick and show specific fields of benchmark result.\n Check how this option value format: https://www.npmjs.com/package/ts-benchmark#fields',
			type: 'string',
		})
		.wrap(Math.min(100, yargs.terminalWidth()))
		.help().argv;
};

export default userInterface;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type UserInterfaceType = () => Record<any, any>;
