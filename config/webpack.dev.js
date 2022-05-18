const { merge } = require("webpack-merge");
const common = require("./webpack.common");
module.exports = merge(common, {
  // 启用webpack内置在相应环境（development/production）下的优化
  mode: "development",
});
