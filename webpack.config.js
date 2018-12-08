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
	}
}

module.exports = config;