const mongoose =require("mongoose");

// const orderSchema=new mongoose.Schema({
//     products:{
//         type:Array,
//         required:[true,"Enter Order Product"]
//     },
//     userId:{
//         type:String,
//         required:[true,"Enter UserId"]
//     },
//     date:{
//         type:String,
//         required:true
//     },
//     shippingAddress:{
//         type:String,
//         required:[true,"Address Required"]
//     }
// });

// const orderModel=new mongoose.model("Order",orderSchema);
// module.exports=orderModel;




// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     products: [{
//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true,
//             min: 1
//         }
//     }],
//     totalAmount: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['Pending', 'Shipped', 'Delivered'],
//         default: 'Pending'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;



const orderSchema=mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            // default:"India",
            required:true
        },
        pinCode:{
            type:Number,
            required:true
        },
        phoneNo:{
            type:Number,
            required:true
        }
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required:true
            },

        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    paymentInfo:{
        id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    },
    paidAt:{
        type:Date,
        required:true
    },
    itemsPrice:{
        type:Number,
        default:0
    },
    taxPrice:{
        type:Number,
        default:0
    },
    shippingPrice:{
        type:Number,
        default:0
    },
    totalPrice:{
        type:Number,
        default:0
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Processing"
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
    

})


const orderModel=new mongoose.model("Orders",orderSchema);
module.exports=orderModel;