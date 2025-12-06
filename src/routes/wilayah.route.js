const express = require("express");
const router = express.Router();
const controller = require("../controllers/wilayah.controller");

// provinces
router.get("/provinces", controller.getProvinces);
router.get("/provinces/:id", controller.getProvinceById);

// regencies
router.get("/regencies", controller.getRegencies);
router.get("/regencies/:id", controller.getRegencyById);

// districts
router.get("/districts", controller.getDistricts);
router.get("/districts/:id", controller.getDistrictById);

// villages
router.get("/villages", controller.getVillages);
router.get("/villages/:id", controller.getVillageById);

module.exports = router;
