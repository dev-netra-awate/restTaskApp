const mongoose= require ('mongoose')

const subTaskSchema = new mongoose.Schema({
    subTaskID:String,
    subtaskParentTaskID:String,
    subTaskTitle:String,
    subTaskCreatedDate:String,
    subTaskCreatedTime:String,
    subTaskCreatedBy:String,
    subTaskStatus:String,
    subTaskTargetDate:String,
    subTaskTargetTime:String

})  
module.exports=mongoose.model('SubTask',subTaskSchema)