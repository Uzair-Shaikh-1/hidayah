const Book = require("../schema/book")

const createBook = async (req,res) =>{
try{

const {title,author,read,description,category,page} = req.body

const existingBook = await Book.findOne({read})
    if(existingBook){
        return res.status(400).json({
            message:"Book Already Exist"
        })
    }


const book = await Book.create({
    title,
    author,
    description,
    category,
    read,
    page
})

res.status(201).json({
    message:"Book created Successfully",
book
})
}
catch(err){
res.status(500).json({
    message:`err in creating the book ${err.message}`
})
}
}

const getBook = async(req,res) =>{
    try{
        const books = await Book.find({})

        res.status(201).json({
            message:"Book fetched Successfully",
            books
        })
    }
    catch(err){
        res.status(500).json({
            message:`was not able to fetch the book${err.message}`
        })
    }
}

const updateBook = async(req,res) =>{
    try{
const {id} = req.params

const book = await Book.findByIdAndUpdate( id,req.body,{
    new:true,
    newValidators:true
})
if(!book){
    return res.status(404).json({
        message:"Book not Found"
    })
}
res.status(200).json({
    message:"Book updated Successfully",
    book
})
    }
    catch(err){
        message:`was not able to update the book ${err.message}`
    }
}

const deleteBook = async(req,res)=>{
    try{
const {id} = req.params
const dltBook = await Book.findByIdAndDelete(id,req.body,{
    ew:true,
    newValidators:true
})
if(!dltBook){
    return res.status(404).json({
        message:"Can not find the book"
    })
}
res.status(200).json({
    message:'Book deleted Successfully'
})
    }
    catch(err){
        res.status(500).json({
            message:`could not delete the book ${err.message}`
        })
    }
}
module.exports = {
    createBook,
    getBook,
    updateBook,
    deleteBook
}