// TODO: stay on plugin-typescript 3.x pending this issue:
// https://github.com/rollup/plugins/issues/287
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';
import replace from '@rollup/plugin-replace';

export default {
    input: 'src/main.ts',
    output: {
        file: 'out/bundle.js',
        format: 'es'
    },
    plugins: [
        vue(),
        resolve(),
        commonjs(),
        typescript(),
        postcss({
            extract: true
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        })
    ]
};
