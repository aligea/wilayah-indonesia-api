const rateLimit = require("express-rate-limit");
const logger = require("../utils/logger");

module.exports = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 120, // 120 request / menit
  message: {
    status: "error",
    message: "Too many requests, please try again later.",
  },
  handler: function (req, res, next, options) {
    logger.logError(new Error("Rate limit exceeded"), req);
    res.status(options.statusCode).json(options.message);
  },
});
