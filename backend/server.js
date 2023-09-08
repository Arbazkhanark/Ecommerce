const express =require("express");
const dbConnection = require("./database");
const app = express();
require("dotenv").config();
app.use(express.json());

dbConnection();

app.use(require("./Routes/productRoute"))



app.listen(process.env.PORT || 5000,()=>console.log(`Server is running on http://localhost:${process.env.PORT}`));