const jwt = require('jsonwebtoken')
const verifyTokens=async(req,res,next)=>{
    // const token=req.headers.authorization.split(' ')[1]
    const token=req.cookies.token;


    try {
        if(!token){
            return res.status(403).json({ message: 'Access denied , Token Required' });
        }

        const verified=await jwt.verify(token,process.env.SECRET_KEY);
        // console.log(verified.userId);
        if(verified){
            req.user=verified;
            next()
        }else{
            return res.status(402).send({success:false,msg:"Token is Invalid"});
        }
        
    } catch (error) {
        res.status(500).send({success:false,Error:`error occured ${error}`});
    }

}



module.exports={verifyTokens};