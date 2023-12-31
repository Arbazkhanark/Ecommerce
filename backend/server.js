const express =require("express");
const dbConnection = require("./database");
const app = express();
const cookieParser=require("cookie-parser");
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());

dbConnection();

//Importing Routes
app.use(require("./Routes/productRoute"))
app.use(require("./Routes/userRoute"));
app.use(require("./Routes/orderRoute"));





//Importing Middlewares to Solve ERROR
// app.use(require("./Middlewares/error"))

const server=app.listen(process.env.PORT,()=>console.log(`Server is running on http://localhost:${process.env.PORT}`));

//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err}`);
    console.log("Sutting Down the Server.....");

    server.close(()=>{
        process.exit(1);
    })
})

