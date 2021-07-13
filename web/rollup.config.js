import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy-watch';
import sass from 'node-sass';

export default {
    input: 'src/main.ts',
    output: {
        file: 'out/bundle.js',
        format: 'es',
        inlineDynamicImports: true
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
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        copy({
            watch: 'css/style.scss',
            targets: [{
                src: 'css/style.scss',
                dest: 'out',
                rename: 'style.css',
                transform: (contents) => sass.renderSync({ data: contents.toString() }).css
            }]
        })
    ]
};
