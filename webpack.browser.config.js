var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname,'client/main.js'),

	target: 'web',

	output: {
		filename: 'app.js',
		path: path.resolve(__dirname,'build/client')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
	    new HtmlWebpackPlugin({
	      template: "./client/index.html"
	    })
  	],
	stats: 'errors-only'
}
