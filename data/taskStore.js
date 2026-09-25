
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


async function createTask(title) {

    let [task] = await con.query('insert into tasks (title) values(?)',[title]);
    let [rows] = await con.query('SELECT * from tasks where id = ?',[task.insertId]);
    return rows[0];
}

async function getAllTasks() {
    const [rows] = await con.query('SELECT * from tasks');
    return rows;
}

async function getTaskById(id) {
    const [rows] = await con.query('SELECT * from tasks where id = ?',[id]);
    return rows[0];
}

async function updateTask(id, completed) {
    let task = await getTaskById(id);

    if (task === undefined)
        return undefined;

    let taskUpdate = await con.query('UPDATE tasks SET completed = ? WHERE id = ?',[completed,id]);

    return await getTaskById(id);
}

async function deleteTask(id) {
    let temp = await getTaskById(id);
    let taskDelete = await con.query('DELETE FROM tasks WHERE id = ?',[id]);

    return temp;
}

module.exports = {
    getAllTasks:getAllTasks,
    getTaskById:getTaskById,
    createTask:createTask,
    updateTask:updateTask,
    deleteTask:deleteTask
}