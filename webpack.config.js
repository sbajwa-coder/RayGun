var path = require("path");

module.exports = {
	entry: path.resolve(__dirname,'server/server.js'),

	target: 'node',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname,'build')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
}
