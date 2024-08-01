const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve("./dist"),
    filename: "script/bundle.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve("./public/index.html"),
    }),
  ],
  module: {
    rules: [{ test: /.ts$/, loader: "ts-loader" }],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
