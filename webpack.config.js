const path = require("path");
const webpack = require('webpack');
const NODE_MODULES_PATH = path.resolve(__dirname,"./node_modules");


var ansiColors = {
  red: '00FF00' // note the lack of "#"
};
var overlayStyles = {
  color: '#FF0000' // note the inclusion of "#" (these options would be the equivalent of div.style[option] = value)
};
module.exports = {
  mode: 'development',
	devtool:"eval",
	entry:[
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&ansiColors=' + encodeURIComponent(JSON.stringify(ansiColors)) + '&overlayStyles=' + encodeURIComponent(JSON.stringify(overlayStyles)),//配置 webpack-dev-middleware 的热加载
		'./src/client'
	],
	  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
      __CLIENT__: JSON.stringify(true),
      __SERVER__: JSON.stringify(false),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: NODE_MODULES_PATH,
    }]
  }
}