var path = require('path')

module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'build.js'
  },
  devServer: {
    contentBase: './example',
    stats: { colors: true },
    port: 5000
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  vue: {
    loaders: {
      scss: 'style!css!sass',
      exclude: 'node_modules'
    }
  }
}