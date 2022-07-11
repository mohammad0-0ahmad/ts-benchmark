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

export const whiteSpaceUC = '\u2800';
export const VerticalUC = '\u2000';

export const tableFieldsColors: Record<TableStaticColumns, string> = {
	field: 'white',
	branch: 'lightgreen',
	initial: 'blue',
	previous: 'yellow',
	current: 'cyan',
};

export const tableColorMap: ColorMap = {
	lightgreen: '\x1b[1m\x1b[32m',
};

export const terminalSymbols = {
	checkMark: '✓',
	crossMark: '⛌',
} as const;

export const githubSymbols = {
	checkMark: '✔️',
	crossMark: '❌',
} as const;

export const githubTableStyle: ComplexOptions = {
	style: {
		headerTop: {
			left: VerticalUC,
			mid: VerticalUC,
			right: VerticalUC,
			other: whiteSpaceUC,
		},
		headerBottom: {
			left: VerticalUC,
			mid: VerticalUC,
			right: VerticalUC,
			other: whiteSpaceUC,
		},
		tableBottom: {
			left: whiteSpaceUC,
			mid: whiteSpaceUC,
			right: whiteSpaceUC,
			other: whiteSpaceUC,
		},
		vertical: VerticalUC,
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

export type TableStaticColumns = 'field' | 'branch' | 'initial' | 'previous' | 'current';
