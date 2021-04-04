// TODO: stay on plugin-typescript 3.x pending this issue:
// https://github.com/rollup/plugins/issues/287
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';

export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/bundle.js',
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
    ]
};
