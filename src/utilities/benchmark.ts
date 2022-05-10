import run from './run';

export const benchmark: BenchmarkType = async ({ path }) => {
	if (!path) {
		return;
	}
	return await run(`tsc -p ${path} --extendeddiagnostics`);
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type BenchmarkType = (args: Record<any, any>) => Promise<string | void>;
