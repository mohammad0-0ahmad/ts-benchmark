import run from './run';

export const benchmark: BenchmarkType = async ({ $0, path }) => {
	if (!path) {
		return;
	}
	try {
		const { error, stdout } = await run(`tsc -p ${path} --extendeddiagnostics -noEmit`);
		const resultStartAt = stdout.indexOf('Files:');
		if (error) {
			console.error(`${$0}:\n`, stdout.substring(0, resultStartAt));
		}
		if (resultStartAt === -1) {
			console.log(stdout);
			return;
		}
		return stdout.substring(resultStartAt);
	} catch (error) {
		// console.log(error);
		return;
	}
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type BenchmarkType = (args: Record<any, any>) => Promise<string | void>;
