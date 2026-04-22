const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const correlationId = require("./middleware/correlationId");
const { logger, requestLogger } = require("./middleware/logger");
const routes = require("./config/routes");

const app = express();

app.use(correlationId);
app.use(requestLogger);

const SERVICE_NAME = process.env.SERVICE_NAME || "unknown-service";

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: SERVICE_NAME,
    timestamp: new Date().toISOString(),
  });
});

for (const r of routes) {
  app.use(
    createProxyMiddleware({
      pathFilter: (pathname) =>
        pathname === r.path || pathname.startsWith(`${r.path}/`),
      target: r.target,
      changeOrigin: true,
      on: {
        proxyReq: (proxyReq, req) => {
          if (req.correlationId) {
            proxyReq.setHeader("X-Correlation-Id", req.correlationId);
          }
        },
        error: (err, req, res) => {
          logger.error("proxy_error", {
            correlationId: req.correlationId,
            path: req.originalUrl,
            target: r.target,
            error: err.message,
          });
          if (!res.headersSent) {
            res.status(502).json({
              code: "SERVICE_UNAVAILABLE",
              message: `Upstream service unavailable: ${r.path}`,
              correlationId: req.correlationId,
            });
          }
        },
      },
    })
  );
}

app.use((req, res) => {
  res.status(404).json({
    code: "ROUTE_NOT_FOUND",
    message: `Route ${req.method} ${req.originalUrl} not found`,
    correlationId: req.correlationId,
  });
});

module.exports = app;
