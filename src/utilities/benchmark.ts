import run from './run';

export const benchmark: BenchmarkType = async ({ $0, path }) => {
	if (!path) {
		return;
	}
	try {
		const { error, stdout } = await run(`tsc -p ${path} --extendeddiagnostics`);
		let resultStartAt = 0;
		if (error) {
			resultStartAt = stdout.indexOf('Files:');
			console.error(`${$0}:\n`, stdout.substring(0, resultStartAt));
		}
		return stdout.substring(resultStartAt);
	} catch (error) {
		return;
	}
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type BenchmarkType = (args: Record<any, any>) => Promise<string | void>;
