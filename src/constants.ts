import chalk from 'chalk';
import {
	ColumnOptionsRaw,
	ComplexOptions,
} from 'console-table-printer/dist/src/models/external-table';
import { ColorMap } from 'console-table-printer/dist/src/utils/colored-console-line';

/**
 *
 */
export const storage: StorageType = {};

/**
 *
 */
export const benchmarkFields = [
	'Files',
	'Lines of Library',
	'Lines of Definitions',
	'Lines of TypeScript',
	'Lines of JavaScript',
	'Lines of JSON',
	'Lines of Other',
	'Nodes of Library',
	'Nodes of Definitions',
	'Nodes of TypeScript',
	'Nodes of JavaScript',
	'Nodes of JSON',
	'Nodes of Other',
	'Identifiers',
	'Symbols',
	'Types',
	'Instantiations',
	'Memory used',
	'Assignability cache size',
	'Identity cache size',
	'Subtype cache size',
	'Strict subtype cache size',
	'I/O Read time',
	'Parse time',
	'ResolveModule time',
	'ResolveTypeReference time',
	'Program time',
	'Bind time',
	'Check time',
	'printTime time',
	'Emit time',
	'Total time',
];

export const tableFieldsColors: Record<TableStaticColumns, string> = {
	field: 'white',
	initial: 'blue',
	previous: 'yellow',
	current: 'cyan',
};

export const branchFieldColor = 'b_green';

export const tableColorMap: ColorMap = {
	b_green: '\x1b[1m\x1b[32m',
};

console.log(chalk.red());

export const unicodeSymbols = {
	checkMark: chalk.green('\u2714'),
	crossMark: chalk.red('\u2716'),
} as const;

export const githubTableStyle: ComplexOptions = {
	style: {
		headerTop: {
			left: ' ',
			mid: ' ',
			right: ' ',
			other: ' ',
		},
		headerBottom: {
			left: '|',
			mid: '|',
			right: '|',
			other: '-',
		},
		tableBottom: {
			left: ' ',
			mid: ' ',
			right: ' ',
			other: ' ',
		},
		vertical: '|',
	},
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

interface StorageType {
	initial?: void | Record<any, any>;
	branch?: void | Record<any, any>;
	branchName?: string;
	currentBranchName?: string;
	previous?: void | Record<any, any>;
	tableColumns?: ColumnOptionsRaw[];
}

export type TableStaticColumns = 'field' | 'initial' | 'previous' | 'current';
