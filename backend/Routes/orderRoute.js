const { makeOrder, singleOrderAdmin, getAllUserOrders, allOrders, updateStatus, deleteOrder } = require("../controllers/orderController");
const { verifyTokens } = require("../middlewares/middleware");

const router=require("express").Router();


router.get("/order",(req,res)=>{
    res.send("Hello World")
});


router.post("/order",verifyTokens,makeOrder)        //-- User
.get("/getOrderAdmin/:id",singleOrderAdmin)         //-- Admin
.get("/allOrders",allOrders)                        //-- Admin
.put("/updateStatus/:id",updateStatus)              //-- Admin
.delete("/deleteOrder/:id",deleteOrder)             //-- Admin
.get("/myOrders",verifyTokens,getAllUserOrders)     //--User



module.exports=router;