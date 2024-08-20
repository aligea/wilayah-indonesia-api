const config = require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const fs = require("fs/promises");

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

async function setup_tables() {
  var sql_query_pulau = await fs.readFile("./db/pulau.sql", "utf8");
  var sql_query_wilayah = await fs.readFile("./db/wilayah.sql", "utf8");
  //console.log(sql_query_pulau);
  db.query(sql_query_pulau, (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return;
    }
    //console.log("SQL execution results:", results);
  });
  db.query(sql_query_wilayah, (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return;
    }
    db.close();
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  setup_tables();
});
