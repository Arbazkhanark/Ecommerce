const {createProduct, getAllProducts,updateProduct, singleProduct, deleteProduct, searchProduct, reviews} = require("../controllers/productController");
const { verifyTokens } = require("../middlewares/middleware");

const router=require("express").Router();


router.post("/product/new",createProduct)
    .get("/products",getAllProducts)
    .put("/product/update/:id",updateProduct)
    .get("/get/product/:id",singleProduct)
    .delete("/del/product/:id",deleteProduct)
    .get("/id/product",searchProduct)
    .post("/add/review/:id",verifyTokens,reviews)


module.exports=router;