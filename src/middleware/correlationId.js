const { v4: uuidv4 } = require("uuid");

module.exports = (req, res, next) => {
  const correlationId = req.get("X-Correlation-Id") || uuidv4();
  req.correlationId = correlationId;
  req.headers["x-correlation-id"] = correlationId;
  res.set("X-Correlation-Id", correlationId);
  next();
};
