'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
// Todo: entry通过fs自动读取生成
let BowerWebpackPlugin = require('bower-webpack-plugin');

let buildEntryPoint = function(entryPoint){
  return [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    entryPoint
  ]
}
let config = Object.assign({}, baseConfig, {
  entry: {
    // jobs: buildEntryPoint('./src/site/lbd/view/job/main/index'),
    // jobDetail: buildEntryPoint('./src/site/lbd/view/job/detail/index'),
    // jobSearch: buildEntryPoint('./src/site/lbd/view/job/search/index'),
    // candidates: buildEntryPoint('./src/site/lbd/view/candidate/main/index'),
    // candidateDetail: buildEntryPoint('./src/site/lbd/view/candidate/detail/index'),
    // messages: buildEntryPoint('./src/site/lbd/view/message/main/index'),
    // joinApplication: buildEntryPoint('./src/site/lbd/view/message/join/index'),
    // me: buildEntryPoint('./src/site/lbd/view/me/main/index'),
    // information: buildEntryPoint('./src/site/lbd/view/me/info/index'),
    // errors: buildEntryPoint('./src/site/lbd/view/error/errors/index'),
    // notFound: buildEntryPoint('./src/site/lbd/view/error/notFound/index'),
    // landingEmployer: buildEntryPoint('./src/site/lbd/view/landing/employer/index'),
    // landingHeadhunting: buildEntryPoint('./src/site/lbd/view/landing/headhunting/index'),
    // recommendation: buildEntryPoint('./src/site/lbd/view/sharing/recommendation/index'),
    comment: buildEntryPoint('./src/site/lbd/view/comment/commentbox/index'),
    clone: buildEntryPoint('./src/site/lbd/view/cloneelemnt/index'),
    form: buildEntryPoint('./src/site/lbd/view/form/index'),
    hoc: buildEntryPoint('./src/site/lbd/view/hoc/index')
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
