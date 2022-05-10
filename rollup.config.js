import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import autoExternal from 'rollup-plugin-auto-external';
import shebang from 'rollup-plugin-add-shebang';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
		},
	],
	plugins: [
		shebang({ include: 'bin/index.js'}),
		typescript({
			tsconfig: './tsconfig.json',
		}),
		autoExternal(),
		terser(),
	],
};
