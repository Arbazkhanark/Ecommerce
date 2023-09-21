const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");


///////////////// Create Order     -- User
const makeOrder = async(req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
    paidAt
  } = req.body;

  console.log(req.user.userId);
  try {
      const newOrder=new orderModel({
        shippingInfo,
        orderItems,
        paymentInfo,
        user:req.user.userId,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus,
        paidAt:Date.now()
      })

    const ordered=await newOrder.save();
    res.status(200).send({success:true,order:ordered})
  } catch (error) {
    console.log(error);
    res.status(500).send({success:false,Msg:"Internal Server Error"})
  }
};






///////////////////////////////// Single Order  --⁡⁢⁣⁣𝘈͟𝘥͟𝘮͟𝘪͟𝘯⁡
const singleOrderAdmin= async(req,res)=>{
    const id=req.params.id;
    try {
        const order=await orderModel.findById(id).populate("user","name email"); //⁡⁣⁢⁣⁡⁣⁢⁣ℙ𝕆ℙ𝕌𝕃𝔸𝕋𝔼⁡
        if(!order){
            return res.status(400).send({success:false,order:"No Order..."});
        }

        res.status(200).send({success:true,order:order});
    } catch (error) {
        res.status(500).send({success:false,order:"Internal Server Error"});
    }
}










////////////////////////////////Orders of User Logged In      --User
const getAllUserOrders=async(req,res)=>{

    try {
        const orders=await orderModel.find({user:req.user.userId})

        if(!orders){
            return res.status(400).send({success:false,orders:"No Order"});
        }

        res.status(200).send({success:true,orders:orders})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,order:"Internal Server Error"})
    }
}



////////////////////////// All Orders  --⁡⁣⁢⁣𝘈͟𝘥͟𝘮͟𝘪͟𝘯⁡
const allOrders= async(req,res)=>{
    try {
        const orders=await orderModel.find();
        if(!orders){
            return res.status(400).send({success:false,orders:"No Orders..."})
        }
        
        //Calculate Total Orders Price
        const allTotalPrice=orders.reduce((acc,order)=>acc+order.totalPrice,0);
        console.log(allTotalPrice);


        res.status(200).send({success:true,TotalPrice:allTotalPrice,orders:orders});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,orders:"Internal Server Error"});
    }
}








////////////////// Update Product Status  --⁡⁣⁢⁣𝘈͟𝘥͟𝘮͟𝘪͟𝘯⁡
const updateStatus=async(req,res)=>{
    const id=req.params.id;

    try {
        const order=await orderModel.findById(id);
        console.log(order.orderStatus);
        if(order.orderStatus==="Delivered"){
            return res.status(400).send({success:false,warning:"You have already delivered this order"});
        }

        // Minus the Product's Quantity if order is Delivered
        const allOrderItems=order.orderItems;
        // console.log(productId);
        for (const item of allOrderItems) {
            const productId = item.product;
            const quantity = item.quantity;

            // Find the product and update its quantity
            const product = await productModel.findById(productId);
            if (product) {
                console.log(product.stock);
                product.stock -= quantity;
                await product.save();
            }else{
                return res.send("Product Not Found")
            }
        }


        order.orderStatus=req.body.status;
        if(req.body.status==="Delivered"){
            order.deliveredAt=Date.now();
        }
        const updatedStatus=await order.save();
        res.status(200).send({success:true,updatedStatus:updatedStatus})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,warning:"Something Wrong on Internal Server"});
    }
}







//////////////////////////////// Delete Order --Admin
const deleteOrder=async(req,res)=>{
    const id=req.params.id;
    try {
        const order=await orderModel.findById(id);
        if(!order){
            return res.status(400).send({success:false,warning:"Order Not Found"})
        }
        const deletedOrder=await orderModel.findByIdAndDelete(id);
        res.status(200).send({success:true,deleteOrder:deletedOrder});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,deleteWarning:"Something went wrong on Internal Server....."})
    }
}






module.exports={makeOrder,singleOrderAdmin,getAllUserOrders,allOrders,updateStatus,deleteOrder}