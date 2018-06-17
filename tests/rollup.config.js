import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: 'tests/**/*-test.js',
  output: {
    file: 'build/bundle-test.js',
    format: 'cjs',
    sourcemap: true,
    interop: false
  },
  plugins: [multiEntry()],
  external: ['ava', 'path', 'levelup', 'leveldown', 'mqtt']
};
