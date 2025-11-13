const path = require('path');
const StatsPlugin = require('stats-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const context = path.resolve(__dirname, '..');

module.exports = {
  context: context,
  entry: './client',
  output: {
    path: path.resolve(context, '..', 'public'),
    filename: 'js/[name]-[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-react-loader',
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [
    new StatsPlugin('../client/dist/stats.json', {chunkModules: true}),
    new webpack.DefinePlugin({
      BROWSER: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new Dotenv()
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'whatwg-fetch': 'fetch',
  },
  devtool: 'source-map'
};