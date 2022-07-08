import { Table } from 'console-table-printer';
import { githubTableStyle, storage, tableColorMap } from 'src/constants';
import { ArgsType } from 'src/ui';
import { benchmark } from './benchmark';
import { benchmarkResultToObject, resolveBenchmarkTableData } from './formatter';

export const print = async (args: ArgsType) => {
	const { save, $0, branch } = args;
	console.log(`${$0}: Start benchmarking...\n`);
	const current = benchmarkResultToObject(args, await benchmark(args));
	const tableData = resolveBenchmarkTableData(args, {
		...(storage?.branch ? { [branch as unknown as string]: storage.branch } : {}),
		...(storage?.initial ? { initial: storage.initial } : {}),
		...(storage?.previous ? { previous: storage.previous } : {}),
		...(current ? { current } : {}),
	});

	const table = new Table({
		...(args.github ? githubTableStyle : {}),
		colorMap: tableColorMap,
		...tableData,
	});

	table?.printTable();

	if (save) {
		storage.previous = current;
	}
	if (
		args.github &&
		tableData?.rejectedFieldsDetails &&
		tableData?.rejectedFieldsDetails.length > 0
	) {
		const core = require('@actions/core');
		const detailsTable = new Table({
			...(args.github ? githubTableStyle : {}),
			colorMap: tableColorMap,
			columns: [
				{
					name: 'field',
					alignment: 'left',
				},
				{
					name: 'current',
					alignment: 'left',
				},
				{
					name: 'maximum',
					alignment: 'left',
					color: 'cyan',
				},
			],
			rows: tableData.rejectedFieldsDetails,
		});
		core.error();
		core.setFailed(
			`Action failed with error:\n
			The following tests have failed:\n
			 ${tableData.rejectedFieldsDetails.map(({ field }) => field).join(' ')}.\n\n
					${detailsTable.render()}`,
		);
	}
};
