const path = require('path');

module.exports = {
  entry: './src/index.ts',  // Entry point for TypeScript
  output: {
    filename: 'bundle.js',  // Output JavaScript file
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',  // Use ts-loader for transpiling TypeScript
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
};
