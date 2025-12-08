const express = require("express");
const cors = require("cors");
const routes = require("./routes/wilayah.route");
const viewRoutes = require('./routes/view.route');
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// rate limit for public API
app.use(rateLimiter);

// view routes (serves the test HTML)
app.use('/', viewRoutes);
app.use('/api/v1/', viewRoutes);
app.use('/api/', viewRoutes);

// versioning
app.use("/api/v1", routes);

// error handler (last)
app.use(errorHandler);

module.exports = app;
