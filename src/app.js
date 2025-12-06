const express = require("express");
const cors = require("cors");
const routes = require("./routes/wilayah.route");
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// rate limit for public API
app.use(rateLimiter);

// versioning
app.use("/api/v1", routes);

// error handler (last)
app.use(errorHandler);

module.exports = app;
