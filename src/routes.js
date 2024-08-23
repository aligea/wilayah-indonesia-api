const express = require("express");
const router = express.Router();
const services = require("./services");
const controllers = require('./controllers');

router.get("/", (req, res) => {
  res.send("API Documentation");
});

router.get("/provinces", controllers.ProvinceController.getAllProvince);
router.get("/province/:provinceId", controllers.ProvinceController.getProvinceByID);
router.get("/regencies/:provinceId", controllers.RegencyController.getAllRegenciesInProvince);
router.get("/regency/:regencyID", controllers.RegencyController.getRegencyByID);
router.get("/districts/:regencyID", controllers.DistrictController.getDistrictsInRegency);
router.get("/district/:districtID", controllers.DistrictController.getDistrictByID);
router.get("/villages/:districtID", controllers.VillageController.getVillagesInDistrict);
router.get("/village/:villageID", controllers.VillageController.getVillageByID);
router.get("/search/:query", controllers.SearchController.getResultByQuery);

module.exports = router;
