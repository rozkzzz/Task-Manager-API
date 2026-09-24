const taskStore = require('../data/taskStore');

async function getTasks(req, res) {
    let tasks = await taskStore.getAllTasks();
    return res.json(tasks);
}

function getTaskById(req, res) {
    let taskId = Number(req.params.id);

    if (Number.isNaN(taskId))
        return res.status(400).json({
            message: 'ID must be a number'
        });

    let task = taskStore.getTaskById(taskId);

    if (task === undefined)
        return res.status(404).json({
            message: 'Task not found'
        });

    return res.json(task);
}

async function createTask(req, res) {
    if (
        typeof req.body.title !== 'string' ||
        req.body.title.trim() === ''
    ) {
        return res.status(400).json({
            message: 'Title is required'
        });
    }

    let title_trim = req.body.title.trim();

    let newTask = await taskStore.createTask(title_trim);

    return res.status(201).json(newTask);
}

async function updateTask(req, res) {
    let taskId = Number(req.params.id);

    if (Number.isNaN(taskId))
        return res.status(400).json({
            message: 'ID must be a number'
        });

    if (typeof req.body.completed !== 'boolean')
        return res.status(400).json({
            message: 'Completed must be a boolean'
        });

    let task = await taskStore.updateTask(
    taskId,
    req.body.completed
    );

    if (task === undefined)
        return res.status(404).json({
            message: 'Task not found'
        });

    return res.json(task);
}

async function deleteTask(req, res) {
    let taskId = Number(req.params.id);

    if (Number.isNaN(taskId))
        return res.status(400).json({
            message: 'ID must be a number'
        });

    let deletedTask = await taskStore.deleteTask(taskId);

    if (deletedTask === undefined)
        return res.status(404).json({
            message: 'Task not found'
        });

    return res.json(deletedTask);
}
module.exports = {
    getTasks: getTasks,
    getTaskById: getTaskById,
    createTask: createTask,
    updateTask:updateTask,
    deleteTask: deleteTask
};