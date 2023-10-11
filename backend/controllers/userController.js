const userModel = require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
const nodemailer=require("nodemailer");
const crypto=require("crypto");
require("dotenv").config();




const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD
        // user:"arbaazkhanark23@gmail.com",
        // pass:"ymxnalsxpmcqzhlb"
    }
})


// Register  --User      ⁡--⁡⁣⁣⁢Confirm password⁡
const register=async(req,res,next)=>{
    const {name,email,password,confirmPassword}=req.body;

    
    try {
        const isEmailAlready=await userModel.findOne({email}).select('+password');
        
        console.log(isEmailAlready);
        if(!isEmailAlready){
            const encrypt=await bcrypt.hash(password,10);
            // Node:-     require("crypto").randomBytes(32).toString('hex')
            const verfiConfirmPassword=await bcrypt.compare(confirmPassword,encrypt);
            if(!verfiConfirmPassword){
                return res.status(400).send({success:false,error:"password and Confirm Password should be same"});
            }
            const newData= new userModel({
                name,
                email,
                password:encrypt,
                role,
                avatar:{
                    public_id:"1224 878 98 78",
                    url:"gcvhgcfftfyu uy uy uyyu.jpg"
                }
            })
            // const token=await jwt.sign(newData,process.env.SECRET_KEY)
            const user=await newData.save();
            const savedUser = await userModel.findOne({email}, {password: 0})
            res.status(201).json({success:true,data:savedUser});
        }else{
            res.status(409).send({success:false,msg:"User Already Exist"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,Error:error.message});
    }

}



// LogIn ---User   -- ⁡⁣⁣⁢save in cookie ⁡
const login =async(req,res,next) => {
    const {email,password} =req.body;

    if(!email || !password){
        return res.status(400).send("Please fill the required fields");
    } 
  
    try{
        const user =await userModel.findOne({email});
  
        if(user){
            console.log(`Attempting to compare: ${password} and ${user.password}`);
            const isPasswordValid =await bcrypt.compare(password,user.password);
  
            if(isPasswordValid){
                const token =jwt.sign({ userId:user._id},process.env.SECRET_KEY,{expiresIn:"10m"});
                res.cookie("token",token,{ httpOnly: true, maxAge:12*60*1000 })
                user.token=token;
                await user.save();
                return res.status(200).send({success:true,msg:"Logged In", token });
            }
        }
  
        return res.status(401).send({success:false, msg:"Invalid Credentials" });
    }catch(error){
        console.error(error)
        res.status(500).send({success:false, Error:`Error Occurred ${error}`});
    }
};


// All Users  --A
const allUsers=async(req,res)=>{
    try {
        const all_Users=await userModel.find();  // ⁡⁣⁣⁢role is user⁡
        if(!all_Users){
            return res.status(404).send({success:false,msg:"No Users in Database"});
        }
        res.status(200).send({success:true,users:all_Users})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,msg:"Server Error"});
    }
}

//Get Single User  --A
const getUser=async(req,res)=>{
    const id=req.params.id;
    try {
        const singleUser=await userModel.findById(id);
        if(!singleUser){
            return res.status(404).send({success:false,msg:"User Not Found"});
        }
        res.status(200).send({success:true,user:singleUser});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,msg:"Server Error"});
    }
}


// Change User ROLE --A
const changeUserRole=async(req,res)=>{

}


// Delete User --A
const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try {
        const user=await userModel.findByIdAndDelete(id)
        if(!user){
            res.status(404).send({success:false,msg:"User Not Found"});
        }
        res.status(200).send({success:true,deletedUser:user});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,msg:"Server Error"});
    }
}


// Get Single User Details  -- ⁡⁢⁣⁡⁢⁢⁢only login user can access⁡⁡
const getUserDetails=async(req,res)=>{
    const id=req.user.userId;
    try {
        const user=await userModel.findById(id);
        if(!user){
            return res.status(404).send({success:false,msg:"User found Found"});
        }

        res.status(200).send({success:true,user:user});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,msg:"Server Error"})
    }
}


// Change Profile
const updateProfile= async(req,res)=>{
    // const {name,email,phone}=req.body;
    const id=req.user.userId

    try {
        const updateUser=await userModel.findByIdAndUpdate(id,req.body,{new:true});
        if(updateUser){
            res.status(200).send({success:true,Update:updateUser});
        }else{
            res.status(404).send({success:false,msg:"Invalid User"});
        }
    } catch (error) {
        res.status(500).send({success:true,Error:`Error Occurred ${error}`})
    }
}


// if old password is right than change the password
const changePassword=async(req,res)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body;
    const id=req.user.userId;
    try {

        const user=await userModel.findById(id)
        if(!user){
            return res.status(400).send({success:false,msg:"Invalid User"});
        }

        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(400).send({success:false,msg:"Enter Required Felids"});
        }

        const verifyOldPass=await bcrypt.compare(oldPassword,user.password);
        if(!verifyOldPass){
            return res.status(400).send({success:false,msg:"Incorrect Old Password"});
        }

        const newPass=await bcrypt.hash(newPassword,10);
        const verifyNewPass=await bcrypt.compare(confirmPassword,newPass);
        if(!verifyNewPass){
            return res.status(400).send({success:false,msg:"New Password or Confirm Password should be same"})
        }
        await userModel.findByIdAndUpdate(id,{password:newPass})
        return res.status(200).send({success:true,updatedPasswordUser:user});

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,msg:"Server Error"})
    }
}


// Forgot Password
const forgotPassword=async(req,res)=>{
    const email=req.body.email;

    try {
        const user=await userModel.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        
        // Generate a reset token for Link
        const resetPasswordToken=crypto.randomBytes(20).toString("hex");
        //Hashing
        // const resetPasswordTokenHash=crypto.createHash("sha256").update(resetPasswordToken).digest("hex");



        // Link Expire Time
        const resetTokenExpiration=Date.now()+300000;

        // Save the reset token and expiration is the user's document
        user.resetPasswordToken=resetPasswordToken;
        user.resetPasswordExpire=resetTokenExpiration;
        await user.save();


        //Send an email with a link that includes the reset token
        const resetLink=`http://localhost:4000/reset-password/${resetPasswordToken}`;
        const mailOptions={
            from:process.env.SMTP_MAIL,
            to:email,
            subject:"Password Reset",
            text:`Click the following link to reset your password: ${resetLink}`,
        }

        await transporter.sendMail(mailOptions);
        res.status(200).json({message:`Password reset email sent`})

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"})
    }
}

// RESET PASSWORD⁡
const resetPassword=async(req,res)=>{
    const {token}=req.params;
    const {newPass,confirmPassword}=req.body

    try {
        const user=await userModel.findOne({resetPasswordToken:token,resetPasswordExpire:{$gt:Date.now()}})

        // console.log(user);
        if(!user){
            return res.status(400).send({success:false,msg:"Invalid Link or expired token"})
        }
        // console.log(user);

        const encrypt=await bcrypt.hash(newPass,10);
        const confirm=await bcrypt.compare(confirmPassword,encrypt);
        if(!confirm){
            return res.status(400).send({success:false,msg:"Password doesn't Match"})
        }
        user.password=encrypt;
        console.log(user.password);
        await user.save();
        res.status(201).json({success:true, user})
    } catch (error) {
        console.error(error);
        res.status(500).send({success:false,msg:error.message})
    }
}


// Log Out
const logout=async(req,res)=>{
    const token=req.headers.authorization.split(' ')[1];

    try {
        const user=await userModel.findOne({token})
    } catch (error) {
        
    }
}





module.exports={register,login,updateProfile,forgotPassword,resetPassword,logout,getUserDetails,allUsers,getUser,deleteUser,changePassword};