var path = require('path')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'FLObservableSocket',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: __dirname,
        options: {
          presets: [
            ['es2015', {'modules': false}]
          ]
        }
      }
    ]
  }
}
