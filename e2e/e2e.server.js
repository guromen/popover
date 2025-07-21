const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.common.js");

const compiler = webpack(config);
const server = new WebpackDevServer({ ...config.devServer }, compiler);

server.startCallback(() => {
  console.log("Dev server started");
  if (process.send) {
    process.send("ok");
  }
});
