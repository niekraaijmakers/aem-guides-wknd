const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   performance: {hints: "warning"},
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].bundle.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: 'js/[name].[hash:8].js',
      // This is the URL that app is served from. We use "/" in development.
      publicPath: '/',
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: paths.staticIndex
      }),
      new HtmlWebpackInjector()
   ],
   devServer: {
      inline: true,
      proxy: [{
         context: ['/content', '/etc.clientlibs', '/etc/wknd'],
         target: 'http://localhost:4503',
      }],

   }
});