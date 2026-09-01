const jwt = require("jsonwebtoken")

const protect = (req,res,next) =>{
    try{
const token = req.cookies.token
if(!token){
    return res.status(401).json({
        message:'no token provided'
    })
}

const decoded = jwt.verify(token,process.env.JWT_SECRET)


console.log("decoded",decoded)
req.user = decoded

next()
    }
    catch(err){
        return res.status(401).json({
            message:"expired Token"
        })
    }
}

const adminOnly = (req,res,next) =>{
    if(req.user.role !== "admin"){
        return res.status(403).json({
            message:"Access denied ONly admin allowed"
        })
    }

    next()
}

module.exports = {protect,adminOnly}