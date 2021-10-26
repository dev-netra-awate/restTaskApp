const mongoose= require ('mongoose')
const taskSchema = new mongoose.Schema({
    taskID:String,
    taskTitle:String,
    taskDescription:String,
    taskCreatedDate:String,
    taskCreatedTime:String,
    taskCreatedBy:String,
    taskStatus:String,
    taskCategory:String,
    taskLocation:String,
    taskTargetStartTime:String,
    taskTargetEndTime:String,
    taskTargetDate:String,
    taskTargetTime:String,
    subtasks:Array,
    collaborators:Array

})  
module.exports=mongoose.model('Task',taskSchema)