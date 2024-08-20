const config = require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const fs = require("fs/promises");
const mysqlConnectOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  multipleStatements: true,
};

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
        `SELECT kode, nama FROM wilayah WHERE kode = ${mysql.escape(
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
      const onErrorConnectionHandler = function(err){
        if (err) throw err;
        console.log("Connected to database");
      };
      const sqlquery = `SELECT kode, nama FROM wilayah WHERE LEFT(kode,2)=${mysql.escape(provinceId)} AND CHAR_LENGTH(kode)=5 ORDER BY nama ASC`;
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
          const onErrorConnectionHandler = function(err){
            if (err) throw err;
            console.log("Connected to database");
          };
          const sqlquery = `SELECT kode, nama FROM wilayah WHERE kode = ${mysql.escape(regencyId)}`;
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

app.listen(port, async () => {
  console.log(`Unit test running on port ${port}`);
  let testresult = await getRegency('11.05');
  console.log(testresult);
});

module.exports = {
    province: {
        getAll : getAllProvince,
        getOne: getProvince
    },
    regency:{
        getAllRegenciesInProvince: getRegenciesInProvince,
        getOne: getRegency
    }
};