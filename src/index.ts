import { main } from './main';
import userInterface, { ArgsType } from './ui';
import { resolveVisibleFieldsEntries } from './utilities/formatter';

async function cli() {
	const args = userInterface();
	const { $0, save, watch, fields, initial }: ArgsType = args;

	/* -------------------------------------------------------------------------- */
	/*                                Checking args                               */
	/* -------------------------------------------------------------------------- */
	if (save && !watch) {
		console.warn(`${$0}: "save" option is not available when watch mode is inactive!`);
	}
	if (initial && !watch) {
		console.warn(`${$0}: "initial" option is not available when watch mode is inactive!`);
	}

	/* -------------------------------------------------------------------------- */
	/*                                  Preparing                                 */
	/* -------------------------------------------------------------------------- */
	const visibleFields = resolveVisibleFieldsEntries(fields);
	args.visibleFields = visibleFields;

	main(args);
}
cli();
