const {createProduct, getAllProducts,updateProduct, singleProduct, deleteProduct} = require("../controllers/productController");

const router=require("express").Router();


router.post("/product/new",createProduct).get("/products",getAllProducts)
.put("/product/update/:id",updateProduct).get("/get/product/:id",singleProduct).delete("/del/product/:id",deleteProduct)


module.exports=router;