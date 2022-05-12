import { ColumnOptionsRaw } from 'console-table-printer/dist/src/models/external-table';

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

export const tableColors: Record<TableStaticColumns, any> = {
	field: 'white',
	initial: 'blue',
	previous: 'yellow',
	current: 'cyan',
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
