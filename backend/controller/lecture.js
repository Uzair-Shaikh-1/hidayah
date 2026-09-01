const lecture = require("../schema/lecture")

const  createLecture  = async(req,res) =>{
    try{
const {title,speaker,category,description,link} = req.body

const existingLecture = await lecture.findOne({link})


if(existingLecture){
    return res.status(400).json({
        messsage:"lecture already exist"
    })
}

const lectures = await lecture.create({
    title,speaker,category,description,link
})
res.status(201).json({
    message:"lecture created successfully",
    lectures
})
    }
    catch(err){
        res.status(500).json({
            message:`can not create lecture ${err.message}`
        })
    }
} 

const getLectures = async(req,res) =>{
    try{
const lectures = await lecture.find({})

res.status(201).json({
    message:"lectures are fetched successfully",
    lectures
})
    }
    catch(err){
        res.status(500).json({
            message:`can not find lectures ${err.message}`
        })
    }
}

const updateLecture = async(req,res)=>{
    try{
const {id} = req.params

const updatelectures = await lecture.findByIdAndUpdate(id,req.body,{
   new:true,
    newValidators:true
})
if(!updatelectures){
    return res.status(404).json({
        message:"can not find lecture"
    })
}
res.status(201).json({
    message:"lecture updated successfully",
    updatelectures
})
    }
    catch(err){
        res.status(400).json({
            message:`can not update lecture ${err.message}`
        })
    }
}

const deleteLecture = async(req,res)=>{
    try{
const {id} = req.params

const dltlecture = await lecture.findByIdAndDelete(id,req.body,{
     new:true,
    newValidators:true
})
if(!dltlecture){
    return res.status(404).json({
        message:"can not find lecture to delete"
    })
}

res.status(201).json({
    message:"lecture updated successfully"
})
    }
    catch(err){
        res.status(500).json({
            message:`can not delete lecture ${err.message}`
        })
    }
}

module.exports = {
    createLecture,
    getLectures,
    updateLecture,
    deleteLecture
}