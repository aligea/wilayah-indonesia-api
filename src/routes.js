const express = require("express");
const router = express.Router();
const services = require("./services");

router.get("/", (req, res) => {
  res.send("API Documentation");
});

router.get("/provinces", async (req, res) => {
  let Provinces = await services.province.getAll();
  res
    .status(200)
    .send({ response: { status: 200, message: "OK" }, data: Provinces });
});
router.get("/province/:provinceId", async (req, res) => {
  const {
    params: { provinceId },
  } = req;
  let Province = await services.province.getOne(provinceId);

  res
    .status(200)
    .send({ response: { status: 200, message: "OK" }, data: Province });
});

module.exports = router;
