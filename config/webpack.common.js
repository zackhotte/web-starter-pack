const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const parts = require('./webpack.parts');
const config = require('./config');


module.exports = merge([
	{
		entry: {
			app: parts.PATHS.app,
		},
		output: {
			path: parts.PATHS.build,
			filename: config.paths.jsOutput,
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Web Starter Pack',
				template: './src/templates/index.html',
				inject: true,
				favicon: './src/favicon.ico',
			}),
			new webpack.ProvidePlugin({
		      	$: 'jquery',
		      	jQuery: 'jquery',
		      	'window.jQuery': 'jquery',
		    }),
		],
	},
	parts.loadJavaScript({
		exclude: /node_modules/,
	}),
]);
