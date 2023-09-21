const mongoose =require("mongoose");
const validator=require("validator");


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        validate:[validator.isEmail,"Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Enter the Password"],
        minLength:[8,"Password should be at least 8 character"],
        // select:false
    },
    orders: [{
        items: [String],
        time: Date,
        address:[String]
    }],
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    token:{
        type:String
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})


const userModel=new mongoose.model("User",userSchema);

module.exports=userModel;