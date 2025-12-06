const service = require("../services/wilayah.service");
const response = require("../utils/response");

// PROVINCES
exports.getProvinces = async (req, res, next) => {
  try {
    const [rows] = await service.getProvinces();
    return response.success(res, rows);
  } catch (err) {
    next(err);
  }
};

exports.getProvinceById = async (req, res, next) => {
  try {
    const [rows] = await service.getProvinceById(req.params.id);
    if (rows.length === 0) return response.notFound(res, "Province not found");
    return response.success(res, rows[0]);
  } catch (err) {
    next(err);
  }
};

// REGENCIES
exports.getRegencies = async (req, res, next) => {
  if (!req.query.province_id) {
    return response.error(res, "province_id query parameter is required", 400);
  }
  try {
    const [rows] = await service.getRegencies(req.query.province_id);
    return response.success(res, rows);
  } catch (err) {
    next(err);
  }
};

exports.getRegencyById = async (req, res, next) => {
  try {
    const [rows] = await service.getRegencyById(req.params.id);
    if (rows.length === 0) return response.notFound(res, "Regency not found");
    return response.success(res, rows[0]);
  } catch (err) {
    next(err);
  }
};

// DISTRICTS
exports.getDistricts = async (req, res, next) => {
  if (!req.query.regency_id) {
    return response.error(res, "regency_id query parameter is required", 400);
  }
  try {
    const [rows] = await service.getDistricts(req.query.regency_id);
    return response.success(res, rows);
  } catch (err) {
    next(err);
  }
};

exports.getDistrictById = async (req, res, next) => {
  try {
    const [rows] = await service.getDistrictById(req.params.id);
    if (rows.length === 0) return response.notFound(res, "District not found");
    return response.success(res, rows[0]);
  } catch (err) {
    next(err);
  }
};

// VILLAGES
exports.getVillages = async (req, res, next) => {
  if (!req.query.district_id) {
    return response.error(res, "district_id query parameter is required", 400);
  } 
  try {
    const [rows] = await service.getVillages(req.query.district_id);
    return response.success(res, rows);
  } catch (err) {
    next(err);
  }
};

exports.getVillageById = async (req, res, next) => {
  try {
    const [rows] = await service.getVillageById(req.params.id);
    if (rows.length === 0) return response.notFound(res, "Village not found");
    return response.success(res, rows[0]);
  } catch (err) {
    next(err);
  }
};
