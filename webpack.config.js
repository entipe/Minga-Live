const webpack = require("webpack");
const path = require("path");

let config = {
  	entry: "./src/js/index.js",
  	output: {
    	path: path.resolve(__dirname, "./js"),
    	filename: "./bundle.js",
    	publicPath: '/js/'
  	},
  	module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env']
	        }
	      }
	    }
	  ]
	},
	mode: 'production',
	devtool : 'none',
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: false
		}
	}
}

module.exports = config;