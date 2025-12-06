const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 120, // 120 request / menit
  message: {
    status: "error",
    message: "Too many requests, please try again later."
  }
});
