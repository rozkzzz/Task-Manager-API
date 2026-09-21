const express = require('express');
const app  = express();
const port = 3000;

const taskRoutes = require('./routes/taskRoutes');
const taskStore = require('./data/taskStore');
const tasks = taskStore.tasks;


app.use(express.json());
app.use('/tasks',taskRoutes);


app.get('/', function(req,res){
    res.send('Task Manager API is running');
});

let nextTaskId;
if (tasks.length === 0)
   nextTaskId = 1;
else{
    let temp = tasks.map(function(task){
        return task.id;
    })    
    nextTaskId = Math.max(...temp)+1;
}
    

app.post('/tasks',function(req,res){
    if(typeof req.body.title !== 'string' || (req.body.title).trim() ==='')
        return res.status(400).json({message:'Title is required'});
    let title_trim = (req.body.title).trim();
    let newTask ={
        id:nextTaskId,
        title:title_trim,
        completed:false,
    }
    tasks.push(newTask);
    nextTaskId++;
    taskStore.saveTasks();
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
    taskStore.saveTasks();
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
    taskStore.saveTasks();
    return res.json(deletedTask);

});

app.listen(port,function(){
    console.log('server is on');
});