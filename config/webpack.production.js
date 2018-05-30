const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common');
const parts = require('./webpack.parts');


const productionConfig = merge([
	{
        mode: 'production',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new UglifyJsPlugin()
        ]
    },
    parts.extractCSS({
        test: /\.(scss|css)$/,
        use: [
            {loader: 'css-loader', options: {minimize: true}},
            'sass-loader'
        ],
    }),
    parts.clean(['../build']),
    parts.copy(),
    parts.generateSourceMaps({ type: false }),
]);

module.exports = merge([
	common, 
	productionConfig,
]);
