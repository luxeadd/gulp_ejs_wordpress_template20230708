const path = require("path");

const jsRules = {
  test: /\.js$/, // .jsファイルを対象
  exclude: /node_modules/, // node_modulesディレクトリを除外
  use: {
    loader: "babel-loader", // babel-loaderを使用
    options: {
      presets: [
        [
          "@babel/preset-env",
          {
            // useBuiltIns: "usage", // 必要なpolyfillのみをインポート
            // corejs: 3, // core-jsのバージョン
            targets: {
              ie: 11,
            },
          },
        ],
      ],
      plugins: ["@babel/plugin-transform-runtime"], // babelプラグイン
    },
  },
};

module.exports = {
  mode: "development",
  // entry: "../src/js/script.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist/assets/js"),
  },
  module: {
    rules: [jsRules],
  },
  resolve: {
    extensions: [".js"], // .js 拡張子を解決
  },
  devtool: "source-map",
  optimization: {
    minimize: false, // 圧縮を無効化
  },
};
