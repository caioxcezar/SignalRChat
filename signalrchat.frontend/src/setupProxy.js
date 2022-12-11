const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./app.json");
const context = ["/api"];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: config.server,
    secure: false,
    ws: true
  });

  app.use(appProxy);
};
