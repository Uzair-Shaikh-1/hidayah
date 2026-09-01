const express = require("express")
const router = express.Router()
const {protect,adminOnly} = require("../middleware/authmiddleware")
const {createLecture,getLectures,updateLecture,deleteLecture} = require("../controller/lecture")

router.post("/add",protect,adminOnly,createLecture)
router.get("/get",getLectures)
router.put("/update/:id",protect,adminOnly,updateLecture)
router.delete("/delete/:id",protect,adminOnly,deleteLecture)

module.exports = router