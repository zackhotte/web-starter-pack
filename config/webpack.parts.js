const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config');

console.log(path.join(__dirname));

exports.PATHS = {
	app: path.join(__dirname, config.paths.entry),
	build: path.join(__dirname, config.paths.build)
};

exports.loadCSS = ({ test, include, exclude, use } = {}) => ({
	module: {
	    rules: [
        	{
                test,
                include,
                exclude,
                use,
            },
        ],
	},
});

exports.extractCSS = ({ test, use } = {}) => {
	const plugin = new ExtractTextPlugin({
		filename: config.paths.cssOutput,
	}); 

  	return {
	    module: {
	        rules: [
	            {
	                test,
	                use: plugin.extract({
	                	fallback: 'style-loader',
			        	use,
			        }),
	            },
	        ],
	    },
	    plugins: [plugin],
    };
};

exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
	    rules: [
	        {
	            test: /\.js$/,
	            include,
	            exclude,
	            use: [
	                {
	                	loader: 'babel-loader',
	                	options: {
	                		presets: ['env', 'react'],
	                	},
	                },
	            ],
	        },
	    ],
    },
});

exports.devServer = ({ host, port } = {}) => ({
	devServer: {
		historyApiFallback: true,
	    stats: "errors-only",
	    host,
	    port, 
	    overlay: {
	      	errors: true,
	      	warnings: true,
	    },
	 },
});

exports.clean = ({ dir, options } = {}) => ({
	plugins: [
		new CleanWebpackPlugin(dir, options),
	],
});

exports.copy = () => ({
	plugins: [
		new CopyWebpackPlugin(filesToMove()),
	],
});

exports.generateSourceMaps = ({ type }) => ({
	devtool: type,
});


const getFilesFromSource = () => {
	const src = path.join(__dirname, '../src');
	const dir = fs.readdirSync(src);

	return dir.filter(file => {
		return fs.lstatSync(src + '/' + file).isFile() == true;
	});	
}

const filesToMove = () => {
	const files = getFilesFromSource();
	let filesToMove = [
		{from: 'src/images', to: 'images'}
	];

	files.forEach(file => {
		if (config.exludeCopyFiles.indexOf(file) == -1) {
			filesToMove.push({from: 'src/' + file, to: '.'});
		}
	});

	return filesToMove;
}

