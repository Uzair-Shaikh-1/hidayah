const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const numberRegex = /^03\d{9}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/~`])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/~`]{8,}$/

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required to Create An Account"],
        trim: true,
        match: [emailRegex, "please fill in a valid email address"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required to Create An Account"],
        minlength: [6, "Password Should contain more than 6 characters"],
        match: [passwordRegex, "Please fill in a valid password"],
        select: false
    },
    number: {
        type: String,
        required: [true, "Number is Required to Create An Account"],
        trim: true,
        match: [numberRegex, "Please fill in a valid number"]
    },
    role:{
        type:String,
        anum:["user","admin"],
        default:"user"
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    return
})
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
const userModel = mongoose.model("users", userSchema)

module.exports = userModel