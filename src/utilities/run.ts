import { exec } from 'child_process';

const run: RunType = (cmd) => {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error);
				reject();
			}
			resolve(stdout ? stdout : stderr);
		});
	});
};

export default run;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type RunType = (cmd: string) => Promise<string | void>;
