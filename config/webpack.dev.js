const { merge } = require("webpack-merge");
const common = require("./webpack.common");

process.env.NODE_ENV = "development";
module.exports = merge(common, {
  devtool: "inline-source-map",
  // 启用webpack内置在相应环境（development/production）下的优化
  mode: "development",
});
