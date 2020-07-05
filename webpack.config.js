const path = require('path');

module.exports = {
  'mode': 'development',
  'entry': 'src/index.js',
  'output': {
    'path': __dirname + '/static',
    'filename': '[name].[chunkhash:8].js'
  },
  'devtool': 'source-map',
  'module': {
    'rules': [
      {
        'enforce': 'pre',
        'test': /\.(js|jsx)$/,
        'exclude': /node_modules/,
        'use': 'eslint-loader'
      },
      {
        'test': /\.tsx?$/,
        'exclude': /node_modules/,
        'use': {
          'loader': 'ts-loader',
          'options': {
            'transpileOnly': true
          }
        }
      }
    ]
  }
};
