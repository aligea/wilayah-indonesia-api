const config = require("dotenv").config();
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2/promise");

async function importSQL(filePath) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true, // WAJIB
  });

  const sql = fs.readFileSync(filePath, "utf8");

  try {
    console.log("Running SQL file...");
    await connection.query(sql);
    console.log("✔ SQL import completed");
  } catch (err) {
    console.error("SQL Import Error:", err);
  }

  await connection.end();
}

async function run_migration() {
  const filesToRun = scanSQL(__dirname + "/../seeders");
  //   let filePromises = [];

  for (let i = 0; i < filesToRun.length; i++) {
    const filePath = filesToRun[i];
    console.log(`Running migration file: ${filePath}`);
    await importSQL(filePath);

    console.log(`Executed migration file: ${filePath}`);
  }

  console.log("All migration files have been executed.");
}

function scanSQL(dir) {
  const files = fs.readdirSync(dir);

  return files
    .filter((f) => path.extname(f).toLowerCase() === ".sql")
    .map((f) => path.join(dir, f));
}

run_migration();
