const mongoose = require("mongoose")


const lectureSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    speaker:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports= mongoose.model("lecture",lectureSchema)