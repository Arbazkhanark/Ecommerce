const mongoose=require("mongoose");
require("dotenv").config();

const dbConnection= async()=>{
    try {
        const db=await mongoose.connect(process.env.DB);
        console.log("Database Connected :)");
    } catch (error) {
        console.log(process.env.DB);
        console.log("Failed to Connecting DB",error);
    }
}

module.exports=dbConnection;