import { exec, ExecException } from 'child_process';

const run: RunType = (cmd) => {
	return new Promise((resolve) => {
		exec(cmd, (error, stdout, stderr) => {
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
