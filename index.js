
// const { application } = require('express');
// const express = require('express'); //load express module
// const app = express(); //called express function to store in object app
// const mongoose = require("mongoose") 
// //app.use(express.json);
// const uri = "mongodb+srv://Netra:jNnh12CkOTE2aTt7@noticeboxcluster.ozjun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// //define and declare an array of weather
// const weather = [
//     {id: 1, name: 'Autum'},
//     {id: 2, name: 'Spring'},
//     {id: 3, name: 'Summer'},  
// ]

// //function to search by the id of the wether and display 
// app.get('/api/weather', (req, res) => {
//     res.send(weather)
// });

// app.get('/api/weather/:id', (req, res) => {
//     const weathername = weather.find(w => w.id === parseInt(req.params.id));
//     if(!weathername) res.status(404).send("weather id not found");
//     res.send(weathername);
// });

// //use POST to add 1 more weather to the array 
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
//  app.post('/api/weather', (req, res) => {
//      const weathername = {
//          id: weather.length+1,
//          name: req.body.name,
//      };
// //     //push the weather in the array
//      weather.push(weathername);
//      res.send(weathername);
//  });

// app.get('/', (req, res) =>{
// //res.sendStatus(200).send("OK msg");
// res.status(200).send('some text');
// }
// );

// app.get('/api/courses', (req, res) => {
//     res.status(200).send([1,2,3,4])
// });

// //setting GET route by parameter which starts with :
// app.get('/api/courses/:id', (req, res) => {
//     res.status(200).send(req.params.id)
// });

// //setting GET route for multiple parametes :year/:month
// app.get('/api/posts/:year/:month', (req, res) => {
//     //shows the value of params sent in URL
//     res.send(req.params)
// });

// //query paramaeter is used in URL after ?. eg- ?sortBy = name
// //this is used to provide additonal data to backend.
// // Route parameters are used for essential DataTransfer, where as query parameter for optional data

// app.get('/api/queryparam', (req,res) =>{
//     res.status(200).send(req.query)
// });

// //using environment variable to get PORT value other than 3000
//  //you set the port value on terminal as =>  export PORT=4000
//  const port =process.env.PORT || 3000;
 
//  mongoose
//  .connect(uri, { useNewUrlParser: true })
//  .then(() => {
//      const app = express()

//      app.listen(5000, () => {
//          console.log("Server has started!")
//      })
//  })

// //app.listen(port,()=>  console.log(`app listening on port ${port}`) );



const express = require ('express')
const mongoose= require ('mongoose')
// const favicon = require('express-favicon');
const Visitor= require('./models/visitor')
const Task= require('./models/task_model')
const SubTask= require('./models/subTask_model')
const User=require('./models/user_model')
var favicon = require('serve-favicon')
var path = require('path')
//db password= dV9ebXYfpnxYi8D
//heroku password = UEcbQ;P7`:~p~jA (doesnt include '=')
const app=express()

// app.use(favicon(__dirname + './assets/favicon.png'));
app.use(favicon(path.join(__dirname, './assets/favicon.ico')))
mongoose
.connect('mongodb+srv://Netra:jNnh12CkOTE2aTt7@noticeboxcluster.ozjun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
    useNewUrlParser:true,
    useUnifiedTopology:true, useFindAndModify: false
    }
)
.then(()=>{console.log('Connection is M Successful');}); 
app.use(express.json());
var bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors())
//app.use(express.json())
 // parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());
//app.    use(bodyParser.urlencoded({ extended: true }));
app.post('/postnewtask',async(req,res)=>{    
    const task= new Task({
        taskID : req.body.taskID,
        taskTitle : req.body.taskTitle,
        taskDescription:req.body.taskDescription,
        taskCategory:req.body.taskCategory,
        taskLocation:req.body.taskLocation,
        taskCreatedDate : req.body.taskCreatedDate,
        taskCreatedTime : req.body.taskCreatedTime,
        taskCreatedBy : req.body.taskCreatedBy,
        taskStatus : req.body.taskStatus,
        taskTargetDate : req.body.taskTargetDate,
        taskTargetStartTime : req.body.taskTargetStartTime,
        taskTargetEndTime : req.body.taskTargetEndTime,
        subtasks : req.body.subtasks,
        collaborators : req.body.collaborators
        })       
       
        console.log('Got body:', req.body.taskTitle); 
         console.log()
         try{
            const v1= await task.save()
            res.json(v1)
        }catch(Err){console.log(Err)}
})

app.get('/getspecifictask',async(req,res) => {
    try
    {
        const task=await Task.find
        (
            {taskID:req.params.taskid},
                 (error,data)=>
                     {
                           if(error)
                                   {  
                                   res.json(error)
                                   }
                              else
                                     {  res.json(data)
                                  }
        })
      
    }
    catch(err){}
})


app.post('/updatesubtaskstatus',async(req,res) => {
    const newStatus = { taskStatus: req.body.newStatus };
   let doc = await Task.findOneAndUpdate(
    {
        taskID: req.body.taskID,
        'subtasks.subtaskID': req.body.subtaskID 
      },
      {  
        $set: {
          'subtasks.$.subTaskStatus': req.body.newStatus
        }}
   );
       
   
    res.json(doc)
})


app.post('/updatetaskstatus',async(req,res) => {
    const newStatus = { taskStatus: req.body.newStatus };
    const filter = { taskID: req.body.taskID };
   let doc = await Task.findOneAndUpdate(filter,newStatus   
   );
       
   
    res.json(doc)
})


app.post('/updatetask',async(req,res) => {
    const newStatus = {
        taskTitle : req.body.taskTitle,
        taskDescription:req.body.taskDescription,
        taskTargetDate : req.body.taskTargetDate,
        taskTargetTime : req.body.taskTargetTime,
    };
    const filter = { taskID: req.body.taskID };
   let doc = await Task.findOneAndUpdate(filter,newStatus   
   );
       
   
    res.json(doc)
})



app.post('/updatesubtask',async(req,res) => {
    const newStatus = {      
        subtaskTitle: req.body.subtaskTitle,         
        subTaskTargetDate: req.body.subTaskTargetDate,
        subTaskTargetTime:req.body.subTaskTargetTime,
    };
    const filter = { taskID: req.body.taskID };
    let doc = await Task.findOneAndUpdate(
        {
            taskID: req.body.taskID,
            'subtasks.subtaskID': req.body.subtaskID 
          },
          {
            $set: {
              'subtasks.$.subtaskTitle': req.body.subtaskTitle,
              'subtasks.$.subTaskTargetDate': req.body.subTaskTargetDate,
              'subtasks.$.subTaskTargetTime': req.body.subTaskTargetTime
            }}
       );
   
    res.json(res.status)
})



app.post('/addsubtask1',async(req,res) => {
    let doc = await Task.findOneAndUpdate(
        {
            taskID: req.body.taskID,
          },
          {
            $push: { subtasks:{  
                subtaskID : req.body.subtaskID,               
                subtaskTitle : req.body.subtaskTitle,
                subTaskCreatedDate : req.body.subTaskCreatedDate,
                subTaskCreatedTime : req.body.subTaskCreatedTime,
                subTaskCreatedBy : req.body.subTaskCreatedBy,
                subTaskStatus : req.body.subTaskStatus,
                subTaskTargetDate : req.body.subTaskTargetDate,
                subTaskTargetTime : req.body.subTaskTargetTime}}}
       );
   
    res.json(doc)
    
   
})


app.post('/deletetask',async(req,res) => {
    let doc = await Task.findOneAndDelete(
        {
            taskID: req.body.taskID,
          }
           
       );
   
    res.json(doc)   
   
})

 








app.post('/postnewsubtask',async(req,res)=>{
    
        console.log('Got body:', req.body); 
        const task= new Task({
            taskID : req.body.taskID,
            taskTitle : req.body.taskTitle,
            taskCreatedDate : req.body.taskCreatedDate,
            taskCreatedTime : req.body.taskCreatedTime,
            taskCreatedBy : req.body.taskCreatedBy,
            taskStatus : req.body.taskStatus,
            taskTargetDate : req.body.taskTargetDate,
            taskTargetTime : req.body.taskTargetTime
            })
            const subtask= new SubTask({
                subTaskID : req.body.subTaskID,
                subtaskParentTaskID : req.body.subtaskParentTaskID,
                subTaskTitle : req.body.subTaskTitle,
                subTaskCreatedDate : req.body.subTaskCreatedDate,
                subTaskCreatedTime : req.body.subTaskCreatedTime,
                subTaskCreatedBy : req.body.subTaskCreatedBy,
                subTaskStatus : req.body.subTaskStatus,
                subTaskTargetDate : req.body.subTaskTargetDate,
                subTaskTargetTime : req.body.subTaskTargetTime
                })
    
            const user= new User({
                userID : req.body.userID,
                userName : req.body.userName,
                userPhoto : req.body.userPhoto,
            })    
            
          //   console.log(JSON.stringify(req.body))
             try{
                const v1= await subtask.save()
                res.json(v1)
            }catch(Err){console.log(Err)}
    })

    app.post('/postnewuser',async(req,res)=>{
            const task= new Task({
                taskID : req.body.taskID,
                taskTitle : req.body.taskTitle,
                taskCreatedDate : req.body.taskCreatedDate,
                taskCreatedTime : req.body.taskCreatedTime,
                taskCreatedBy : req.body.taskCreatedBy,
                taskStatus : req.body.taskStatus,
                taskTargetDate : req.body.taskTargetDate,
                taskTargetTime : req.body.taskTargetTime
                })
                const subtask= new SubTask({
                    subTaskID : req.body.subTaskID,
                    subtaskParentTaskID : req.body.subtaskParentTaskID,
                    subTaskTitle : req.body.subTaskTitle,
                    subTaskCreatedDate : req.body.subTaskCreatedDate,
                    subTaskCreatedTime : req.body.subTaskCreatedTime,
                    subTaskCreatedBy : req.body.subTaskCreatedBy,
                    subTaskStatus : req.body.subTaskStatus,
                    subTaskTargetDate : req.body.subTaskTargetDate,
                    subTaskTargetTime : req.body.subTaskTargetTime
                    })
        
                const user= new User({
                    userID : req.body.userID,
                    userName : req.body.userName,
                    userPhoto : req.body.userPhoto,
                })    
                
             //    console.log(JSON.stringify(req.body))
                 try{
                    const v1= await user.save()
                    res.json(v1)
                }catch(Err){console.log(Err)}
        })

app.get('/subtasks',async(req,res) => {
    try
    {
        const subtask=await SubTask.find()
        res.json(subtask)
    }
    catch(err){}
})

app.get('/users',async(req,res) => {
    try
    {
        const user=await User.find()
        res.json(user)
    }
    catch(err){}
})

app.get('/tasks',async(req,res) => {
    try
    {
        const task=await Task.find()
        res.json(task)
    }
    catch(err){}
})

app.get('/getspecificuser',async(req,res) => {
    try
    {

        console.log(req.body.userName)
        const user=await User.find
        (
            {userName:req.body.userName},
                 (error,data)=>
                     {
                           if(error)
                                   {  
                                   res.json(error)
                                   }
                              else
                                     {  res.json(data)
                                  }
        })
      
    }
    catch(err){}
})

const taskdogrouter_2=require('./routers/watchdogrouter')
app.use('/tasks',taskdogrouter_2)
const host = '0.0.0.0';
const port = process.env.PORT || 9000;
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });