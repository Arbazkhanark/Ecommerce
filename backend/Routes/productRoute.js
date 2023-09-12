const {createProduct, getAllProducts,updateProduct, singleProduct, deleteProduct, searchProduct} = require("../controllers/productController");

const router=require("express").Router();


router.post("/product/new",createProduct).get("/products",getAllProducts)
.put("/product/update/:id",updateProduct).get("/get/product/:id",singleProduct).delete("/del/product/:id",deleteProduct).get("/id/product",searchProduct)


module.exports=router;