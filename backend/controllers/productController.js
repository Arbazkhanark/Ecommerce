const productModel = require("../models/productModel");


//Create Product --Admin
const createProduct=async(req,res,next)=>{
    // const newProduct=productModel({
    //     name:req.body.name,
    //     description:req.body.description,
    //     price:req.body.price,
    //     category:req.body.category,
    //     image:req.body.image
    // })
    // const product=await newProduct.save();

    const product=await productModel.create(req.body);
    res.status(200).send({success:true,product});
}



//Get All Product  --------------------Workinggggggggggggggggggg
const getAllProducts=async(req,res,next)=>{
    const products=await productModel.find();
    console.log(products);
    res.status(200).send({success:true,products});
}



// Get Single Product // Product Details
const singleProduct=async(req,res,next)=>{
    const isProduct=await productModel.findById(req.params.id);
    console.log(isProduct);
    if(!isProduct){
        return res.status(500).send({success:false,msg:"Product is Not Found"});
    }

    res.status(200).send({success:true,isProduct});
}






// Update the Product   --Admin

const updateProduct=async(req,res,next)=>{
    const isAvail=await productModel.findById(req.params.id);
    if(!isAvail){
        return res.status(500).send({success:false,msg:"Product Not Found"})
    }

    const updatedProduct=await productModel.findByIdAndUpdate(req.params.id,req.body);
    console.log(updatedProduct);
    res.send(updatedProduct);
}


//Delete the Product --Admin
const deleteProduct=async(req,res,next)=>{
    const isProduct=await productModel.findById(req.params.id);
    if(!isProduct){
        return res.status(500).send({success:false,msg:"Product Not Found!!!"});
    }

    const deletedProduct=await isProduct.deleteOne();
    console.log(deletedProduct);
    res.status(200).send(deletedProduct)
    const obj=new Error("Server error",status);
    next(obj);

}

status|| 500





module.exports={createProduct,getAllProducts,singleProduct,updateProduct,deleteProduct}