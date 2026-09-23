const fs = require('fs').promises;

let tasks = []
try {
    const data = fs.readFileSync('tasks.json', { encoding: 'utf8', flag: 'r' });
    tasks = JSON.parse(data);
} catch (err) {
    console.error('Error reading tasks.json:', err);
    throw err;
}

async function saveTasks() {
    const jsonData = JSON.stringify(tasks, null, 2);

    await fs.promises.writeFile(
        "tasks.json",
        jsonData,
        "utf-8"
    );
}

async function createTask(title) {
    let newTask = {
        id: getNextTaskId(),
        title: title,
        completed: false
    };

    tasks.push(newTask);

    await saveTasks();

    return newTask;
}

function getNextTaskId(){
    if (tasks.length === 0)
        return 1;
    let temp = tasks.map(function(task){
        return task.id;
    })    
    return Math.max(...temp)+1;
    }

function getAllTasks() {
    return tasks;
}

function getTaskById(id) {
    return tasks.find(function(task) {
        return task.id === id;
    });
}
function updateTask(id, completed) {
    let task = getTaskById(id);

    if (task === undefined)
        return undefined;

    task.completed = completed;
    saveTasks();

    return task;
}
function deleteTask(id) {
    let taskIndex = tasks.findIndex(function(task) {
        return task.id === id;
    });

    if (taskIndex === -1)
        return undefined;

    let deletedTask = tasks.splice(taskIndex, 1)[0];

    saveTasks();

    return deletedTask;
}

module.exports = {
    getAllTasks:getAllTasks,
    getTaskById:getTaskById,
    createTask:createTask,
    updateTask:updateTask,
    deleteTask:deleteTask
}