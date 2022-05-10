export const prepareStorage: PrepareStorageType = async ({ $0, path, branch }) => {
	if (!path) {
		return;
	}

	// if (branch) {}
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type PrepareStorageType = (args: Record<any, any>) => Promise<Record<any, any> | void>;
