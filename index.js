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