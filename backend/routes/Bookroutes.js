const express = require("express")
const router = express.Router()
const {protect,adminOnly} = require("../middleware/authmiddleware")
const {createBook,getBook,updateBook,deleteBook}  = require("../controller/book")

router.post("/add",protect,adminOnly,createBook)
router.get("/get",getBook)
router.put("/update/:id",protect,adminOnly,updateBook)
router.delete("/delete/:id",protect,adminOnly,deleteBook)

module.exports = router