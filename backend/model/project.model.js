const mongoose=require("mongoose")

const projectSchema=mongoose.Schema({
    projectName:String,
    DueDate:String,
    task:Array,
    Priority:String,
    CompletionStatus:String,
    userID:String,
    userName:String
})
const projectModel=mongoose.connect("project",projectSchema)

module.exports={projectModel}