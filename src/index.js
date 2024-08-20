// In src/index.js 
const express = require("express"); 
const app = express(); 
const PORT = process.env.PORT || 3000; 
const v1Router = require("./routes.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/v1", v1Router);

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});