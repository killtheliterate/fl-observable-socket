var path = require('path')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'FLObservableSocket',
    libraryTarget: 'umd'
  },

  externals: {
    'most': {
      commonjs: 'most',
      commonjs2: 'most',
      amd: 'most',
      root: 'most'
    },

    '@most/create': {
      commonjs: '@most/create',
      commonjs2: '@most/create',
      amd: 'mostCreate',
      root: 'mostCreate'
    },

    'fluture/es5': {
      commonjs: 'fluture/es5',
      commonjs2: 'fluture/es5',
      amd: 'Fluture',
      root: 'Fluture'
    }
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
