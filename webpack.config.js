var fp = require("path")
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require("./config")(process.argv);

//var lessExtract = new ExtractTextPlugin(fp.join(__dirname, "public", "styles-[name].[chunkhash].css"));

module.exports = {
  entry: {
    app: "./app/client.js",
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "redux"
    ]
  },
  output: {
    path: __dirname + "/public/assets/",
    publicPath: config.server.assetPath,
    filename: "[name].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
    new ExtractTextPlugin("[name].css")
  ],
  module: {
    loaders: [
      { 
        test: /\.jsx?$/,
        loader: "babel", 
        exclude: /node_modules/, 
        query: {
          presets: ["es2015", "es2016", "react"],
          plugins: ["transform-decorators-legacy", "transform-class-properties", "transform-object-rest-spread"],
          cacheDirectory: true
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|woff2|woff|ttf)(\?.*)?$/,
        loader: "file",
        include: /(node_modules)/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css!autoprefixer!sass")
      }
    ]
  },
  resolve: {
    extensions: ["", ".js"],
  },
};
