const express = require('express');
const app  = express();
const port = 3000;

app.use(express.json());
let tasks = [{
            id:1,
            title:'เรียน Express',
            completed:false
            },{
            id:2,
            title:'เรียน pressEx',
            completed:true
            }];

app.get('/', function(req,res){
    res.send('Task Manager API is running');
});

app.get('/tasks',function(req,res){
    res.json(tasks);
});

let nextTaskId = tasks.length+1;

app.post('/tasks',function(req,res){
    if(typeof req.body.title !== 'string' || (req.body.title).trim() ==='')
        return res.status(400).json({message:'Title is required'});
    let title_trim = (req.body.title).trim();
    let newTask ={
        id:nextTaskId,
        title:title_trim,
        completed:false,
    }
    nextTaskId++;
    tasks.push(newTask);
    return res.status(201).json(newTask);
});

app.get('/tasks/:id',function(req,res){
    let taskId = Number(req.params.id);
    if (Number.isNaN(taskId))
        return res.status(400).json({message:'ID must be a number'});
    let task = tasks.find(function(oneTask){
            return oneTask.id === taskId;
    });
    if(task === undefined)
        return res.status(404).json({message:'Task not found'});
    return res.json(task);
});

app.patch('/tasks/:id',function(req,res){
    let taskId = Number(req.params.id);
    if (Number.isNaN(taskId))
        return res.status(400).json({message:'ID must be a number'});
    let task = tasks.find(function(ele){
        return ele.id === taskId;});
    if (task === undefined)
        return res.status(404).json({message:'cant find the id'});
    if (typeof req.body.completed !== 'boolean')
        return res.status(400).json({message:'Completed must be a boolean'});
    task.completed = req.body.completed;
    return res.json(task);
});

app.delete('/tasks/:id',function(req,res){
    let taskId = Number(req.params.id);
    if (Number.isNaN(taskId))
        return res.status(400).json({message:'ID must be a number'});
    let task = tasks.findIndex(function(element){
        return taskId === element.id
    });
    if(task === -1)
        return res.status(404).json({message:'Task not found'});
    let deletedTask = tasks.splice(task,1)[0];
    return res.json(deletedTask);

});
app.listen(port,function(){
    console.log('server is on');
});