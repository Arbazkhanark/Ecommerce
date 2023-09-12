const express =require("express");
const dbConnection = require("./database");
const app = express();
require("dotenv").config();
app.use(express.json());

dbConnection();

//Importing Routes
app.use(require("./Routes/productRoute"))



















//Importing Middlewares to Solve ERROR
// app.use(require("./Middlewares/error"))


const server=app.listen(process.env.PORT || 5000,()=>console.log(`Server is running on http://localhost:${process.env.PORT}`));

//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err}`);
    console.log("Sutting Down the Server.....");

    server.close(()=>{
        process.exit(1);
    })
})

