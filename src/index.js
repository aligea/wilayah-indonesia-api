// In src/index.js 
const express = require("express"); 
const app = express(); 
const PORT = process.env.PORT || 3000; 
const v1Router = require("./routes.js");

// GET [baseurlapp]/v1/regencies/{id_province}
// GET [baseurlapp]/v1/provinces
// GET [baseurlapp]/v1/province/{id_province}
app.use("/v1", v1Router);

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});