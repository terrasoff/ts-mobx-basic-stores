const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const paths = compilerOptions['paths'];

let mapper = pathsToModuleNameMapper(paths);
Object.keys(mapper).map(key => {
  mapper[key] = mapper[key].replace(/^\./, '<rootDir>/src');
});

module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: 'node',
  moduleNameMapper: {
    ...mapper,
  },
  globals: {
    'ts-jest': {
      babelConfig1: true,
      tsConfig: {
        'target': 'ES2019',
      },
      moduleDirectories: [
        'node_modules',
        'src'
      ],
      moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx'
      ]
    }
  },
  testMatch: [
    '<rootDir>/tests/**/*Test.(t|j)s?(x)'
  ],
};
