const productModel = require("../models/productModel");
const mongoose=require("mongoose");
const userModel = require("../models/userModel");
// const ErrorHandler = require("../utils/errorHandler");


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

    try {
        const product=await productModel.create(req.body);
        res.status(200).send({success:true,product});
    } catch (error) {
        res.status(500).send({success:false,msg:error})
    }
}



//Get All Product  --------------------Workinggggggggggggggggggg
// const getAllProducts=async(req,res,next)=>{
//     try {
//         const products=await productModel.find();
//         console.log(products);
//         res.status(200).send({success:true,products});
//     } catch (error) {
//         res.status(500).send({success:false,msg:error})
//     }
// }



// const getAllProducts = async (req, res, next) => {
//     try {
//         let query = {};

//         if (req.query.category) {
//             query.category = req.query.category;
//         }

//         if (req.query.minPrice && req.query.maxPrice) {
//             query.price = {
//                 $gte: parseInt(req.query.minPrice),
//                 $lte: parseInt(req.query.maxPrice)
//             };
//         }

//         if (req.query.minRating) {
//             query.rating = { $gte: parseInt(req.query.minRating) };
//         }

//         const products = await productModel.find(query);

//         if (products.length > 0) {
//             return res.status(200).send({ success: true, products });
//         }

//         return res.status(200).send({ success: true, msg: "No matching products found" });
//     } catch (error) {
//         return res.status(500).send({ success: false, msg: `Server Error: ${error.message}` });
//     }
// }


const getAllProducts=async(req,res,next)=>{
    const {name,category,rating,minPrice,maxPrice}=req.query;
    console.log(req.query);
    const filter={};
    if(name){
        console.log({"Name":name});
        filter.name={$regex:name,$options:'i'}
    }

    if(category){
        filter.category=category;
    }

    if(rating){
        filter.rating=rating;
    }

    if(minPrice && maxPrice){
        filter.price={$gte:minPrice,$lte:maxPrice};
    }
    
    try {
        const products=await productModel.find(filter);
        if(products.length>=1){
            return res.send({success:true,data:products});
        }else{
            return res.send({success:false,data:"No Products.."})
        }
    } catch (error) {
        res.status(500).send({Error:error});
    }
}









//Get Single Product
const singleProduct = async (req, res, next) => {

    try {
        if(mongoose.isValidObjectId(req.params.id)){
            const product = await productModel.findById(req.params.id);
            if (!product) {
                return res.status(404).send({ success: false, msg: "Product Not Found" });
            }
            res.status(200).send({ success: true, msg: product });
    
        }else{
            return res.status(400).send({ success: false, msg: "Invalid Product ID" });        
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,msg:"Server Error"})
    }
};




//Search Product
const searchProduct=async(req,res,next)=>{
    const search=req.body.search;
    try {
        const searchedProducts=await productModel.find({name: { $regex: new RegExp(search, 'i') }});
        if(searchedProducts.length>0){
            console.log(searchedProducts);
            return res.status(200).send({success:true,msg:"Searched Product",data:searchedProducts});
        }
        console.log(searchedProducts);
        res.status(200).send({success:true,msg:"Product Not Found"})
    } catch (error) {
        res.status(400).send({success:false,msg:`Server Error ${error}`})
    }
}








// Update the Product   --Admin
const updateProduct=async(req,res,next)=>{

    if(mongoose.isValidObjectId(req.params.id)){
        const isAvail=await productModel.findById(req.params.id);
        if(!isAvail){
            return res.status(404).send("Product Not Found");
        }
        const updatedItem=await productModel.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).send({success:true,msg:`Updated: ${updatedItem}`})

    }else{
        // Invalid ObjectId, handle the error accordingly
        return res.status(400).send({ success: false, msg: "Invalid Product ID" });
    }

}


//Delete the Product --Admin
const deleteProduct=async(req,res,next)=>{
    if(mongoose.isValidObjectId(req.params.id)){
        const isProduct=await productModel.findById(req.params.id);
        if(!isProduct){
            return res.status(404).send({success:false,msg:"Product Not Found!!!"});
        }

        const deletedProduct=await isProduct.deleteOne();
        console.log(deletedProduct);
        return res.status(200).send({success:true,msg:`Deleted: ${deletedProduct}`})
    }else{
        // Invalid ObjectId, handle the error accordingly
        return res.status(400).send({ success: false, msg: "Invalid Product ID" });
    }
}



//Products Reviews:-- Rating
// const reviews=async(req,res)=>{
//     try {
//         const {comment,rating}=req.body;
//         const {id}=req.params;
//         const product =await productModel.findById(id)
//         const userId=req.user.userId;

//         console.log(product.reviews);
//         const reviewsList=product.reviews;
//         const isIdExist=reviewsList.filter((item)=>userId===item.userId)
//         console.log("Msg: ",isIdExist);



//         const user = await userModel.findById(userId)
//         const reviews={
//             userId,
//             name:user.name,
//             comment,
//             rating:Number(rating)
//         }
        
//         if(isIdExist.length<0){
//             const updatedProduct = await product.updateOne({$push:{reviews}}, {new:true})
//             return res.status(200).json({status:true, updatedProduct})
//         }else{
//             const updatedProduct = await product.updateOne({$set:{reviews}}, {new:true})
//             return res.status(200).json({status:true, updatedProduct})
//         }
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({success:false,msg:error.message})
//     }
// }


const reviews = async (req, res) => {
    try {
        const { comment, rating } = req.body;
        const { id } = req.params;
        const product = await productModel.findById(id)
        const userId = req.user.userId;

        const reviewsList = product.reviews;
        const isExist_Index = reviewsList.findIndex((item) => userId === item.userId);
        
        //Calculate Rating of Reviews
        const sumOfRating=reviewsList.reduce((acc,review)=>acc+review.rating,0);
        let totalRating=sumOfRating/reviewsList.length;
        totalRating=totalRating.toFixed(1)
        product.rating=totalRating;


        const user = await userModel.findById(userId)
        const newReview = {
            userId,
            name: user.name,
            comment,
            rating: Number(rating)
        }

        if (isExist_Index===-1) {
            product.reviews.push(newReview);
        }

        product.reviews[isExist_Index]=newReview;

        //Calculate Number of Reviews
        console.log("::",product.numberOfReviews);
        product.numberOfReviews=reviewsList.length;
        console.log(":::",product.numberOfReviews);


        const updatedProduct = await product.save();
        // const updatedProduct=await productModel.findByIdAndUpdate(id,{newReview})
        return res.status(200).json({ status: true, updatedProduct });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: error.message })
    }
}


module.exports={createProduct,getAllProducts,singleProduct,updateProduct,deleteProduct,searchProduct,reviews}