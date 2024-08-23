const services = require("./services");
const ProvinceController = {
  getAllProvince: async (req, res) => {
    let Provinces = await services.province.getAll();
    res
      .status(200)
      .send({ response: { status: 200, message: "OK" }, data: Provinces });
  },
  getProvinceByID: async (req, res) => {
    const {
      params: { provinceId },
    } = req;
    let Province = await services.province.getOne(provinceId);

    res
      .status(200)
      .send({ response: { status: 200, message: "OK" }, data: Province });
  },
};
const RegencyController = {
  getAllRegenciesInProvince: async (req, res) => {
    const {
      params: { provinceId },
    } = req;
    let Regencies = await services.regency.getAllByProvince(provinceId);

    res
      .status(200)
      .send({ response: { status: 200, message: "OK" }, data: Regencies });
  },
  getRegencyByID: async (req, res) => {
    const {
      params: { regencyID },
    } = req;
    let Regency = await services.regency.getOne(regencyID);

    res
      .status(200)
      .send({ response: { status: 200, message: "OK" }, data: Regency });
  },
};
const DistrictController = {
  getDistrictsInRegency: async (req, res) => {
    const {
      params: { regencyID },
    } = req;
    let Districts = await services.district.getAllByRegency(regencyID);

    res
      .status(200)
      .send({ response: { status: 200, message: "OK" }, data: Districts });
  },
  getDistrictByID: async (req, res) => {
    const {
      params: { districtID },
    } = req;
    let District = await services.district.getOne(districtID);

    res
      .status(200)
      .send({ response: { status: 200, message: "OK" }, data: District });
  },
};
const VillageController = {
  getVillagesInDistrict: async (req, res) => {
    const {
      params: { districtID },
    } = req;
    let Villages = await services.village.getAllByDistrict(districtID);

    res
      .status(200)
      .send({ response: { status: 200, message: "OK" }, data: Villages });
  },
  getVillageByID: async (req, res) => {
    const {
      params: { villageID },
    } = req;
    let Village = await services.village.getOne(villageID);

    res
      .status(200)
      .send({ response: { status: 200, message: "OK" }, data: Village });
  },
};
const SearchController = {
  getResultByQuery: async (req, res) => {
    const {
      params: { query },
    } = req;
    let Results = await services.search.getDataBySearach(query);

    res
      .status(200)
      .send({ response: { status: 200, message: "OK" }, data: Results });
  },
};
module.exports = {
  ProvinceController: ProvinceController,
  RegencyController: RegencyController,
  DistrictController: DistrictController,
  VillageController: VillageController,
  SearchController: SearchController,
};
