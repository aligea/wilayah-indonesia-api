const config = require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs/promises");
const { query } = require("express");
const mysqlConnectOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  multipleStatements: false,
};

/**
 * Subtitute function mysql.escape() to reduce sql injection from url params
 * @param {string} input
 * @returns string with ''
 */
function sanitizeInput(input) {
  // Simulasi fungsi stripslashes dari PHP
  function stripslashes(str) {
    return str.replace(/\\(.)/gm, "$1");
  }

  // Simulasi fungsi mysql_real_escape_string dari PHP
  function escapeString(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
        case "\0":
          return "\\0";
        case "\x08":
          return "\\b";
        case "\x09":
          return "\\t";
        case "\x1a":
          return "\\z";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case '"':
        case "'":
        case "\\":
        case "%":
          return "\\" + char;
      }
    });
  }

  // Hilangkan tag PHP jika ada
  let [beforePhp, afterPhp] = input.split("<?php");
  if (afterPhp) {
    let [phpCode, afterCode] = afterPhp.split("?>");
    input = beforePhp + afterCode;
  }

  // Cek apakah magic quotes diaktifkan, jika ya hapus slashes
  if (/* Kondisi jika magic quotes aktif */ false) {
    input = stripslashes(input);
  }

  // Escape string untuk mencegah SQL injection
  let sql_anti_injection = escapeString(input);

  // tambahkan petik satu
  return require("mysql2").escape(sql_anti_injection);
}

/**
 * Untuk menginsiasi pertama kali tabel di database
 * @returns object database MySQL connection (variabel db untuk kemudian di close connection)
 */
async function setup_tables() {
  mysqlConnectOptions.multipleStatements = true;
  return new Promise(async function (resolve, reject) {
    try {
      const sql_query_pulau = await fs.readFile(
        __dirname + "/db/pulau.sql",
        "utf8"
      );
      const sql_query_wilayah = await fs.readFile(
        __dirname + "/db/wilayah.sql",
        "utf8"
      );
      const db = mysql.createConnection(mysqlConnectOptions);
      const onErrorConnectionHandler = function (err) {
        if (err) throw err;
        console.log("Connected to database");
      };
      const onQueryResponseHandler = function (err, results) {
        if (err) {
          console.error("Error executing SQL:", err);
          return;
        }
        resolve(db);
      };

      db.connect(onErrorConnectionHandler);
      db.query(sql_query_pulau, onQueryResponseHandler);
      db.query(sql_query_wilayah, onQueryResponseHandler);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Untuk mengambil data provinsi
 * @returns arrayObject Province (kode, nama)
 */
const getAllProvince = async function () {
  const db = mysql.createConnection(mysqlConnectOptions);
  return new Promise(function (resolve, reject) {
    try {
      db.connect((err) => {
        if (err) throw err;
        console.log("Connected to database");
      });

      db.query(
        "SELECT kode, nama FROM wilayah WHERE CHAR_LENGTH(kode) = 2 ORDER BY nama ASC",
        (err, results) => {
          if (err) {
            console.error("Error executing SQL:", err);
            return;
          }
          resolve(results);

          // Close the MySQL connection
          db.end((error) => {
            if (error) {
              console.error("Error closing MySQL connection:", error);
              return;
            }
            console.log("MySQL connection closed.");
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Untuk mengambil sebuah data provinsi dengan parameter kode provinsi
 * @param {string} provinceId Example: 12 (two chars)
 * @returns object of province {kode, nama}
 */
const getProvince = async function (provinceId) {
  const db = mysql.createConnection(mysqlConnectOptions);
  return new Promise(function (resolve, reject) {
    try {
      db.connect((err) => {
        if (err) throw err;
        console.log("Connected to database");
      });

      db.query(
        `SELECT kode, nama FROM wilayah WHERE kode = ${sanitizeInput(
          provinceId
        )} ORDER BY nama ASC`,
        (err, results) => {
          if (err) {
            console.error("Error executing SQL:", err);
            return;
          }
          resolve(results[0]);

          // Close the MySQL connection
          db.end((error) => {
            if (error) {
              console.error("Error closing MySQL connection:", error);
              return;
            }
            console.log("MySQL connection closed.");
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Untuk mengambil data kabupaten / kota sesuai dengan parameter kode provinsi
 * @param {string} provinceId Example: 12 (two chars)
 * @returns objectArray of regencies [{kode, nama}]
 */
const getRegenciesInProvince = async function (provinceId) {
  return new Promise(function (resolve, reject) {
    try {
      const db = mysql.createConnection(mysqlConnectOptions);
      const onErrorConnectionHandler = function (err) {
        if (err) throw err;
        console.log("Connected to database");
      };
      const sqlquery = `SELECT kode, nama FROM wilayah WHERE LEFT(kode,2)=${sanitizeInput(
        provinceId
      )} AND CHAR_LENGTH(kode)=5 ORDER BY nama ASC`;
      const onQueryResponseHandler = function (err, results) {
        if (err) {
          console.error("Error executing SQL:", err);
          return;
        }
        resolve(results);

        // Close the MySQL connection
        db.end((error) => {
          if (error) {
            console.error("Error closing MySQL connection:", error);
            return;
          }
          console.log("MySQL connection closed.");
        });
      };

      db.connect(onErrorConnectionHandler);
      db.query(sqlquery, onQueryResponseHandler);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Untuk mengambil sebuah data kabupaten/kota sesuai dengan parameter kode kabupaten/kota
 * @param {string} regencyId Example: 11.05 (five chars)
 * @returns object Regency (kode, nama)
 */
const getRegency = async function (regencyId) {
  return new Promise(function (resolve, reject) {
    try {
      const db = mysql.createConnection(mysqlConnectOptions);
      const onErrorConnectionHandler = function (err) {
        if (err) throw err;
        console.log("Connected to database");
      };
      const sqlquery = `SELECT kode, nama FROM wilayah WHERE kode = ${sanitizeInput(
        regencyId
      )}`;
      const onQueryResponseHandler = function (err, results) {
        if (err) {
          console.error("Error executing SQL:", err);
          return;
        }
        resolve(results[0]);

        // Close the MySQL connection
        db.end((error) => {
          if (error) {
            console.error("Error closing MySQL connection:", error);
            return;
          }
          console.log("MySQL connection closed.");
        });
      };

      db.connect(onErrorConnectionHandler);
      db.query(sqlquery, onQueryResponseHandler);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Untuk mengambil data kecamatan sesuai dengan parameter kode regency
 * @param {string} regencyId Example: '12.06' (5 chars)
 * @returns objectArray of district [{kode, nama}]
 */
const getDistrictsInRegency = async function (regencyId) {
  return new Promise(function (resolve, reject) {
    try {
      const db = mysql.createConnection(mysqlConnectOptions);
      const onErrorConnectionHandler = function (err) {
        if (err) throw err;
        console.log("Connected to database");
      };
      const sqlquery = `SELECT kode, nama FROM wilayah WHERE CHAR_LENGTH(kode) = 8 AND LEFT(kode, 5) = ${sanitizeInput(
        regencyId
      )} ORDER BY nama DESC;`;
      const onQueryResponseHandler = function (err, results) {
        if (err) {
          console.error("Error executing SQL:", err);
          return;
        }
        resolve(results);

        // Close the MySQL connection
        db.end((error) => {
          if (error) {
            console.error("Error closing MySQL connection:", error);
            return;
          }
          console.log("MySQL connection closed.");
        });
      };

      db.connect(onErrorConnectionHandler);
      db.query(sqlquery, onQueryResponseHandler);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Untuk mengambil sebuah data kecamatan sesuai dengan parameter kode kecamatan
 * @param {string} districtId <8 chars> Example: 12.01.13
 * @returns object District (kode, nama)
 */
const getDistrict = async function (districtId) {
  return new Promise(function (resolve, reject) {
    try {
      const db = mysql.createConnection(mysqlConnectOptions);
      const onErrorConnectionHandler = function (err) {
        if (err) throw err;
        console.log("Connected to database");
      };
      const sqlquery = `SELECT kode, nama FROM wilayah WHERE kode = ${sanitizeInput(
        districtId
      )}`;
      const onQueryResponseHandler = function (err, results) {
        if (err) {
          console.error("Error executing SQL:", err);
          return;
        }
        resolve(results[0]);

        // Close the MySQL connection
        db.end((error) => {
          if (error) {
            console.error("Error closing MySQL connection:", error);
            return;
          }
          console.log("MySQL connection closed.");
        });
      };

      db.connect(onErrorConnectionHandler);
      db.query(sqlquery, onQueryResponseHandler);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Untuk mengambil data kelurahan/desa sesuai dengan parameter kode kecamatan
 * @param {string} districtId <8 chars> Example: '12.06.01'
 * @returns objectArray of village [{kode, nama}]
 */
async function getVillagesInDistrict(districtId) {
  return new Promise(function (resolve, reject) {
    try {
      const db = mysql.createConnection(mysqlConnectOptions);
      const onErrorConnectionHandler = function (err) {
        if (err) throw err;
        console.log("Connected to database");
      };
      const sqlquery = `SELECT kode, nama FROM wilayah WHERE CHAR_LENGTH(kode) > 8 AND LEFT(kode,8) = ${sanitizeInput(
        districtId
      )} ORDER BY nama DESC;`;
      const onQueryResponseHandler = function (err, results) {
        if (err) {
          console.error("Error executing SQL:", err);
          return;
        }
        resolve(results);

        // Close the MySQL connection
        db.end((error) => {
          if (error) {
            console.error("Error closing MySQL connection:", error);
            return;
          }
          console.log("MySQL connection closed.");
        });
      };

      db.connect(onErrorConnectionHandler);
      db.query(sqlquery, onQueryResponseHandler);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Untuk mengambil sebuah data kelurahan sesuai dengan parameter kode kelurahan
 * @param {string} villageId <13 chars> Example: '12.01.07.2009'
 * @returns objectArray Village (kode, nama)
 */
const getVillage = async function (villageId) {
  return new Promise(function (resolve, reject) {
    try {
      const db = mysql.createConnection(mysqlConnectOptions);
      const onErrorConnectionHandler = function (err) {
        if (err) throw err;
        console.log("Connected to database");
      };
      const sqlquery = `SELECT kode, nama FROM wilayah WHERE kode = ${sanitizeInput(
        villageId
      )}`;
      const onQueryResponseHandler = function (err, results) {
        if (err) {
          console.error("Error executing SQL:", err);
          return;
        }
        resolve(results[0]);

        // Close the MySQL connection
        db.end((error) => {
          if (error) {
            console.error("Error closing MySQL connection:", error);
            return;
          }
          console.log("MySQL connection closed.");
        });
      };

      db.connect(onErrorConnectionHandler);
      db.query(sqlquery, onQueryResponseHandler);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Untuk mengambil data provinsi/kota/kecamatan kelurahan sesuai dengan parameter query
 * @param {string} inputQuery Example: 'asa'
 * @returns objectArray [{kode, nama, kategori}]
 */
const getDataBySearach = async function (inputQuery) {
  return new Promise(function (resolve, reject) {
    try {
      const db = mysql.createConnection(mysqlConnectOptions);
      const onErrorConnectionHandler = function (err) {
        if (err) throw err;
        console.log("Connected to database");
      };
      const sqlquery = `SELECT kode, nama FROM wilayah WHERE nama LIKE '%${inputQuery}%' ORDER BY CHAR_LENGTH(kode) ASC LIMIT 30 `;
      const onQueryResponseHandler = function (err, results) {
        if (err) {
          console.error("Error executing SQL:", err);
          return;
        }
        resolve(results);

        // Close the MySQL connection
        db.end((error) => {
          if (error) {
            console.error("Error closing MySQL connection:", error);
            return;
          }
          console.log("MySQL connection closed.");
        });
      };

      db.connect(onErrorConnectionHandler);
      db.query(sqlquery, onQueryResponseHandler);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  init_database: setup_tables,
  province: {
    getAll: getAllProvince,
    getOne: getProvince,
  },
  regency: {
    getAllByProvince: getRegenciesInProvince,
    getOne: getRegency,
  },
  district: {
    getAllByRegency: getDistrictsInRegency,
    getOne: getDistrict,
  },
  village: {
    getAllByDistrict: getVillagesInDistrict,
    getOne: getVillage,
  },
  search:{
    getDataBySearach: getDataBySearach
  }
};