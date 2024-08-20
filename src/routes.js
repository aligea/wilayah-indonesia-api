const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("API Documentation");
});

router.get("/provinces", (req, res) => {
  res.send("Get all provinces");
});
router.get("/province/:provinceId", (req, res) => {
  res.send("Get all provinces");
});

module.exports = router;
