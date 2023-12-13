const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    taskName:Array,
    DueDate:String,
    project:String,
    Priority:String,
    CompletionStatus:String,
    userID:String,
    userName:String
   
})
const postModel=mongoose.connect("post",postSchema)

module.exports={postModel}