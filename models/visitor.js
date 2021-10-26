const mongoose= require ('mongoose')
const visitorSchema = new mongoose.Schema({
    nameVisitor:String,
    tempVisitor:Number,
    destinationFlatVisitor:String,
    vehicleNumberVisitor:String,
    timeStamp:String,
    visitorType:String
    // visitorDestinationFlat:{ 
    //     type:String,
    //   //  required:true
    // },
    // visitorType:{
    //     type:String,
    //    // required:true
    // },
    // visitorVehicleNumber:{
    //     type:String,
    //    // required:false
    // }
})  
module.exports=mongoose.model('Visitor',visitorSchema)

// "visitorDestinationFlat" : "C702",
//"visitorType" : "Resident", 
//"visitorVehicleNumber" : "MH 12 QH 2802"