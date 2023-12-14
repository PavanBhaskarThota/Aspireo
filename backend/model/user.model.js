const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    Role:String,
})
const userModel=mongoose.connect("user",userSchema)

module.exports={userModel}