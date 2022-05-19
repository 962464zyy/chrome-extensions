const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

module.exports = {
  // 输入
  entry: {
    background: "/src/background/index.ts",
    popup: "/src/popup/index.ts",
    content: "/src/content/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    // 清除之前生成的文件
    clean: true,
  },
  // 识别.js .tsx .jsx的文件
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "esbuild-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/assets/images", to: "icons" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/popup.html"),
      filename: "popup.html",
    }),
    new WindiCSSWebpackPlugin(),
  ],
  devServer: {
    // 自动打开浏览器
    open: true,
    port: 9624,
  },
};
