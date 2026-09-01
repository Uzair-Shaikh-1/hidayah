const userModel = require("../schema/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const registerUser = async(req,res) =>{
    try{
const {email,password,number} = req.body

const exists = await userModel.findOne({email})

if(exists){
return res.status(404).json({
    message:"User already exists go to login page"
})
}
const user = await userModel.create({
    email,password,number
})

res.status(201).json({
    message:"user created successfully",
user
})
    }
    catch(err){
res.status(500).json({
    message:`can not create user ${err.message}`
})
    }
}

const loginUser = async(req,res) =>{
    try{
const {email,password} = req.body

const user = await userModel.findOne({
    email
}).select("+password")
if(!user){
    return res.status(404).json({
        message:"user does not exist please register first"
    })
}

// compare password

 const isValidPassword = await user.comparePassword(password)

if(!isValidPassword){
   return  res.status(400).json({
        message:"password does not match"
    })
}

// create JWT
const token = jwt.sign({
    id:user._id,
    role:user.role
},
process.env.JWT_SECRET)


res.cookie("token",token)
res.status(200).json({
    message:"logged in successfully",
    user:{
        id:user._id,
        role:user.role
    }
})
    }
    catch(err){
        res.status(500).json({
            message:`can not login user ${err.message}`
        })
    }
}

const logoutUser = async (req,res) =>{
    res.clearCookie("token")
    res.status(200).json({
        message:"logout Successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
   logoutUser
}