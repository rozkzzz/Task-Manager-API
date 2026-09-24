const fs = require('fs');
const mysql = require('mysql2/promise');

let con;

async function toDatabase() {
    try {
        con = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'task_manager'
        });

        console.log('Connected to MySQL Database!');
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
}

toDatabase();

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

async function getAllTasks() {
    const [rows] = await con.query('SELECT * from tasks');
    return rows;
}

function getTaskById(id) {
    return tasks.find(function(task) {
        return task.id === id;
    });
}
async function updateTask(id, completed) {
    let task = getTaskById(id);

    if (task === undefined)
        return undefined;

    task.completed = completed;
    await saveTasks();

    return task;
}
async function deleteTask(id) {
    let taskIndex = tasks.findIndex(function(task) {
        return task.id === id;
    });

    if (taskIndex === -1)
        return undefined;

    let deletedTask = tasks.splice(taskIndex, 1)[0];

    await saveTasks();

    return deletedTask;
}

module.exports = {
    getAllTasks:getAllTasks,
    getTaskById:getTaskById,
    createTask:createTask,
    updateTask:updateTask,
    deleteTask:deleteTask
}