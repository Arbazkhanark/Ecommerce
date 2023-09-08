const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLength:[8,"Price can't exceed 8 charaters"]
    },
    rating:{
        type:Number,
        default:0
    },
    image:[   // ek product ki kaafi image ho skti h isliye Array
        {
            public_id:{ //jabb bhi humm images ko host krrenge tabb humme Public_id milti h
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter product Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numberOfReviews:{
        type:Number,
        default:0
        // required:[true,"Please Enter product Number Of Reviews"],
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const productModel=new mongoose.model("Product",productSchema);

module.exports=productModel;