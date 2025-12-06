const db = require("../config/database");

/**
 * Mengambil semua data provinsi
 * @returns Array of provinces
 */
exports.getProvinces = () => {
  return db.query(
    "SELECT kode, nama FROM wilayah WHERE CHAR_LENGTH(kode) = 2 ORDER BY nama ASC"
  );
};

/**
 * Mengambil data provinsi berdasarkan ID
 * @param {Number} id
 * @returns Province data
 */
exports.getProvinceById = async (id) => {
  let sql =
    "SELECT kode, nama, ibukota, luas, penduduk FROM wilayah_level_1_2 WHERE kode=?";
  let rows = await db.query(sql, [id]);
  rows[0][0].regencies = await this.getRegencies(id).then(
    (result) => result[0]
  );
  return rows;
};

/**
 * Mengambil data kabupaten/kota berdasarkan province_id
 * @param {Number} province_id
 * @returns Array of Regency
 */
exports.getRegencies = (province_id) => {
  let sql =
    "SELECT kode, nama FROM wilayah WHERE LEFT(kode,2)=? AND CHAR_LENGTH(kode)=5 ORDER BY nama ASC";
  return db.query(sql, [province_id]);
};

/**
 * Mengambil data kabupaten/kota berdasarkan ID
 * @param {Number} id
 * @returns Regency data
 */
exports.getRegencyById = async (id) => {
  let sql =
    "SELECT kode, nama, ibukota, luas, penduduk FROM wilayah_level_1_2 WHERE kode=?";
  let rows = await db.query(sql, [id]);
  rows[0][0].districts = await this.getDistricts(id).then(
    (result) => result[0]
  );
  return rows;
};

/**
 * Mengambil data kecamatan berdasarkan regency_id
 * @param {Number} regency_id
 * @returns Array of districts
 */
exports.getDistricts = (regency_id) => {
  let sql =
    "SELECT kode, nama FROM wilayah WHERE CHAR_LENGTH(kode) = 8 AND LEFT(kode, 5) = ? ORDER BY nama ASC";

  return db.query(sql, [regency_id]);
};

/**
 * Mengambil data kecamatan berdasarkan ID
 * @param {Number} id
 * @returns Kecamatan data
 */
exports.getDistrictById = async (id) => {
  let sql =
    "SELECT kode, nama FROM wilayah WHERE CHAR_LENGTH(kode) = 8 AND kode=?";
  let rows = await db.query(sql, [id]);

  rows[0][0].villages = await this.getVillages(id).then((result) => result[0]);
  return rows;
};

exports.getVillages = (district_id) => {
  let sql =
    "SELECT kode, nama FROM wilayah WHERE CHAR_LENGTH(kode) > 8 AND LEFT(kode,8) = ? ORDER BY nama ASC";

  return db.query(sql, [district_id]);
};

exports.getVillageById = (id) => {
  return db.query(
    "SELECT kode, nama FROM wilayah WHERE CHAR_LENGTH(kode) > 8 AND kode = ?",
    [id]
  );
};
