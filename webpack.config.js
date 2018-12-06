const webpack = require("webpack");
const path = require("path");

let config = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "./js"),
    filename: "./bundle.js",
    publicPath: '/js/'
  }
}

module.exports = config;