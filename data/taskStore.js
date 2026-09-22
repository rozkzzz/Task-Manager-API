const fs = require('fs');

let tasks = []
try {
    const data = fs.readFileSync('tasks.json', { encoding: 'utf8', flag: 'r' });
    tasks = JSON.parse(data);
} catch (err) {
    console.error('Error reading tasks.json:', err);
    throw err;
}

function saveTasks(){
    const jsonData = JSON.stringify(tasks, null, 2);
    fs.writeFileSync("tasks.json", jsonData, 'utf-8');
}

let nextTaskId;
function getNextTaskId(){
    if (tasks.length === 0)
        return 1;
    let temp = tasks.map(function(task){
        return task.id;
    })    
    return Math.max(...temp)+1;
    }

module.exports = {
    tasks: tasks,
    saveTasks:saveTasks,
    getNextTaskId:getNextTaskId
}