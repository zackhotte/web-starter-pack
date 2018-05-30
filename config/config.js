module.exports = {
	paths: {
		entry: '../src/index.js',
		build: '../build',
		cssOutput: 'static/css/main.css',
		jsOutput: 'static/js/[name].bundle.js'
	},
	devServerOn: true,
	exludeCopyFiles: ['.DS_Store', 'index.js']
}