const merge = require('webpack-merge');

const parts = require('./webpack.parts');
const common = require('./webpack.common');

const config = require('./config');

const devConfig = merge([
	{
		mode: 'development',
	},
	parts.loadCSS({
		test: /\.(scss|css)$/,
		use: ['style-loader', 'css-loader', 'sass-loader'],
	}),
]);

module.exports = merge([
	common,
	devConfig,
]);
