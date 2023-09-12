const mongoose=require("mongoose");
require("dotenv").config();

const dbConnection= async()=>{
    const db=await mongoose.connect(process.env.DB);
    console.log("Database Connected :)");
}

module.exports=dbConnection;