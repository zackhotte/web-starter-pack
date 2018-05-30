const merge = require('webpack-merge');

const parts = require('./webpack.parts');
const common = require('./webpack.common');


const devConfig = merge([
	{
		mode: 'development',
	},
	parts.devServer({
		host: process.env.HOST,
		port: process.env.PORT,
	}),
	parts.loadCSS({
		test: /\.(scss|css)$/,
		use: ['style-loader', 'css-loader', 'sass-loader'],
	}),
]);

module.exports = merge([
	common,
	devConfig,
]);
