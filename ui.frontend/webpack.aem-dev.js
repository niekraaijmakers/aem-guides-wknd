const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   performance: {hints: "warning"},
   plugins: [
      new HtmlWebpackPlugin({
         template: paths.staticIndex
      }),
      new HtmlWebpackInjector()
   ],
   devServer: {
      inline: true,
      proxy: [{
         context: ['/content', '/etc'],
         target: 'http://localhost:4503',
      }],

   }
});