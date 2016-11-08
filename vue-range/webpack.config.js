var path = require('path')

module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'build.js',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: './example',
    stats: { colors: true },
    port: 5000
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  vue: {
    loaders: {
      babel: 'babel-loader',
      scss: 'style!css!sass',
      exclude: 'node_modules'
    }
  }
}