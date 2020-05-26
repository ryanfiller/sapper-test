import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import { mdsvex } from 'mdsvex';
import svelteSVG from "rollup-plugin-svelte-svg";
import { scss } from 'svelte-preprocess';
import attr from 'remark-attr'
import copy from 'rollup-plugin-copy'

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const preprocess = [
	mdsvex({
		extension: '.md',
		layout: {
			goals: 'src/routes/goals/_goals-layout.svelte',
		},
		remarkPlugins: [
			[attr, { scope: 'every' }]
		]
	}),
	scss()
]

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				extensions: ['.svelte', '.md'],
				preprocess
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			svelteSVG({ dev }),
			copy({
				targets: [
					{ src: 'src/**/images/*.*', dest: 'static/images' }
				]
			}),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte', '.md'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			svelte({
				generate: 'ssr',
				dev,
				extensions: ['.svelte', '.md'],
				preprocess
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs(),
			svelteSVG({ generate: "ssr", dev }),
			copy({
				targets: [
					{ src: 'routes/**/*.jpg', dest: 'static/images' }
				]
			})
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		preserveEntrySignatures: 'strict',
		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		preserveEntrySignatures: false,
		onwarn,
	}
};