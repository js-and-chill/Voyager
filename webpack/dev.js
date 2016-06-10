
import path from 'path'
import webpack from 'webpack'
import postcssImport from 'postcss-import'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import nodeExternals from 'webpack-node-externals'
import electronRenderer from 'webpack-target-electron-renderer'
import fs from 'fs'

const PATHS = {
  app: path.join(__dirname, '../app'),
  dist: path.join(__dirname, '../dist')
}

const env = process.env.NODE_ENV || 'development'

const options = {

  devtool: 'eval',

  resolve: {
    modulesDirectories: [ PATHS.app, 'node_modules' ],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    extensions: ['', '.js'],
    unsafeCache: true,
  },

  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    PATHS.app,
  ],

  output: {
    path: PATHS.dist,
    publicPath: '/dist/',
    filename: 'bundle.js',
  },

  postcss (addDependencyTo) {
    return [ postcssImport({ addDependencyTo }), precss, autoprefixer ]
  },

  module: {

    loaders: [{
      test: /\.js$/,
      include: PATHS.app,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: [ 'es2015', 'react', 'stage-1' ],
        plugins: [ 'add-module-exports', 'transform-decorators-legacy' ],
      },
    }, {
      test: /\.scss$/,
      loaders: [ 'style', 'css', 'postcss-loader?parser=postcss-scss' ],
      include: PATHS.app,
    }],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        BROWSER: JSON.stringify(true)
      }
    }),
  ],

	//externals: [nodeExternals()],

  target: 'electron-renderer'

}

//options.target = electronRenderer(options)

export default options
