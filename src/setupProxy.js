const { createProxyMiddleware } = require("http-proxy-middleware");
const createProxy = createProxyMiddleware({
  target: "https://egov-micro-qa.egovernments.org",
  changeOrigin: true,
});
module.exports = function (app) {
  ["/egov-mdms-service", "/egov-location", "/localization"].forEach((location) => app.use(location, createProxy));
};
