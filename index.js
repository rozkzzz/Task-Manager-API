const express = require('express');
const app  = express();
const port = 3000;

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

app.get('/tasks/:id',function(req,res){
    let taskId = Number(req.params.id);
    let task = tasks.find(function(oneTask){
            return oneTask.id === taskId;
    });
    res.json(task);
});


app.listen(port,function(){
    console.log('server is on');
});