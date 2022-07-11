import { Table } from 'console-table-printer';
import { githubTableStyle, storage, whiteSpaceUC } from 'src/constants';
import { ArgsType } from 'src/ui';
import { benchmark } from './benchmark';
import {
	benchmarkResultToObject,
	resolveBenchmarkTableData,
	resolveGithubTableData,
	restyleTerminalTable,
} from './formatter';
import core from '@actions/core';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';

export const print = async (args: ArgsType) => {
	const { save, $0 } = args;
	const current = benchmarkResultToObject(args, await benchmark(args));
	const tableData = resolveBenchmarkTableData(args, {
		...(storage?.branch ? { branch: storage.branch } : {}),
		...(storage?.initial ? { initial: storage.initial } : {}),
		...(storage?.previous ? { previous: storage.previous } : {}),
		...(current ? { current } : {}),
	});

	const table = new Table({
		...(args.github
			? githubTableStyle
			: {
					rowSeparator: true,
			  }),
		...restyleTerminalTable(tableData),
	}).render();

	console.log(table.replace(/ /g, whiteSpaceUC));

	if (save) {
		storage.previous = current;
	}
	if (process.env?.CI && args.github) {
		if (tableData?.hasBenchmarkFailed) {
			core.setFailed('Action failed, Please check failure details');
		}
		let clientPackageName;

		try {
			const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'));
			clientPackageName = pkg.name;
		} catch (error) {
			// console.log(error);
		}
		core.summary
			.addRaw(`<h3 align="center"><a href="https://www.npmjs.com/package/${$0}">${$0}</a></h3>`)
			.addBreak()
			.addTable(resolveGithubTableData(tableData));
		if (clientPackageName) {
			core.summary
				.addBreak()
				.addRaw(
					`<small align="right">This test has been created by ${$0} for supporting ${clientPackageName}</small>`,
				);
		}
		core.summary.addBreak().write();
	}
};
