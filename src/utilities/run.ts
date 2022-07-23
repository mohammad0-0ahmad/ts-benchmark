import { exec, ExecException } from 'child_process';

const run: RunType = (cmd) => {
	return new Promise((resolve) => {
		exec(cmd, (error, stdout, stderr) => {
			// stdout && console.log('stdout: ',stdout);
			// error && console.log('error: ', error);
			resolve({ error, stdout, stderr });
		});
	});
};

export default run;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type RunType = (
	cmd: string,
) => Promise<{ error: ExecException | null; stdout: string; stderr: string }>;
