const path            = require('path')
const webpack         = require('webpack')
const postcss         = require('postcss-cssnext')
const WebpackNotifier = require('webpack-notifier')

function hostURL() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'prod_url://'; break;
    case 'development':
      return 'http://localhost:3000'; break;
    default:
      return 'prod_url://'; break;
  }
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('postcss-cssnext')()],
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=100000',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'assets': path.resolve(__dirname, 'src/assets'),
      'components': path.resolve(__dirname, 'src/components')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new WebpackNotifier(),
    new webpack.DefinePlugin({
      '__HOST_URL__': JSON.stringify(hostURL())
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
