const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');



const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [{
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React'
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM'
        },
      ],
    }),
    // optimization: {
    //   splitChunks: {
    //     minSize: 1000,
    //     cacheGroups: {
    //       commons: {
    //         name: 'commons',
    //         chunks: 'all',
    //         minChunks: 2
    //       }
    //     }
    //   }
    // },
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only'
  },
  // devtool: 'source-map'
}
module.exports = merge(baseConfig, prodConfig);