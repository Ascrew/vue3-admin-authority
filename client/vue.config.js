const path = require("path");

module.exports = {
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  pages: {
    index: {
      // page 的入口
      entry: "src/main.ts",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  devServer: {
    host: "0.0.0.0",
    https: false,
    port: 8002,
    proxy: {
      "/api": {
        target: "http://0.0.0.0:3000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "src/styles/_variables.scss"),
        path.resolve(__dirname, "src/styles/_mixins.scss"),
      ],
    },
  },
};
