// In src/index.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const v1Router = require("./routes.js");
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.json());
app.use("/v1", v1Router);

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Middleware untuk logging
app.use((req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFile("unknown-routes.log", log, (err) => {
    if (err) throw err;
  });
  next();
});

// Middleware untuk menangani route yang tidak dikenal
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
