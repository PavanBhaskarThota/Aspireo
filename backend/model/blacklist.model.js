const mongoose=require("mongoose")

const tokenSchema=mongoose.Schema({
   token:String,
   
})
const tokenModel=mongoose.connect("token",tokenSchema)

module.exports={tokenModel}