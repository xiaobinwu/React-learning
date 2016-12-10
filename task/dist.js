'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    jobs: path.join(__dirname, '../src/site/lbd/view/job/main/index'),
    jobDetail: path.join(__dirname, '../src/site/lbd/view/job/detail/index'),
    jobSearch: path.join(__dirname, '../src/site/lbd/view/job/search/index'),
    candidates: path.join(__dirname, '../src/site/lbd/view/candidate/main/index'),
    candidateDetail: path.join(__dirname, '../src/site/lbd/view/candidate/detail/index'),
    messages: path.join(__dirname, '../src/site/lbd/view/message/main/index'),
    joinApplication: path.join(__dirname, '../src/site/lbd/view/message/join/index'),
    me: path.join(__dirname, '../src/site/lbd/view/me/main/index'),
    information: path.join(__dirname, '../src/site/lbd/view/me/info/index'),
    errors: path.join(__dirname, '../src/site/lbd/view/error/errors/index'),
    notFound: path.join(__dirname, '../src/site/lbd/view/error/notFound/index'),
    landingEmployer: path.join(__dirname, '../src/site/lbd/view/landing/employer/index'),
    landingHeadhunting: path.join(__dirname, '../src/site/lbd/view/landing/headhunting/index'),
    recommendation: path.join(__dirname, '../src/site/lbd/view/sharing/recommendation/index'),
    vendor: ['react', 'react-dom', 'classnames', 'webpack-zepto', 'react-tap-event-plugin']
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
