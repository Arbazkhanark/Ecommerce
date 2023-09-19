const router=require("express").Router();
const {register, login, updateProfile, forgotPassword, resetPassword, logout, getUserDetails, allUsers, getUser, deleteUser, changePassword} = require("../controllers/userController");
const { verifyTokens } = require("../middlewares/middleware");



router.post("/register",register)
    .post("/login",login)
    .get("/protected",verifyTokens,(req,res)=>res.send("Access"))
    .get("/getUser",verifyTokens,getUserDetails) //   ⁡⁢⁣⁡⁢⁢⁢Token Middleware  if user logged in only than user can see his profile.⁡⁡
    .get("/admin/allUsers",allUsers)   // ⁡⁢⁣⁢authorize role -ONLY ADMIN⁡
    .get("/admin/getUser/:id",getUser)  // ⁡⁢⁣⁢Authorize role -ONLY ADMIN⁡
    .delete("/admin/deleteUser/:id",deleteUser) // ⁡⁢⁣⁢Authorize role -ONLY ADMIN⁡
    .put("/changeProfile",verifyTokens,updateProfile)  //⁡⁢⁣⁡⁢⁢⁢login compulsory⁡⁡
    .put("/update-password",verifyTokens,changePassword)
    .post("/forget-password",forgotPassword)
    .get("/reset-password/:token",resetPassword)
    .post("/user/logout",logout)




module.exports=router;