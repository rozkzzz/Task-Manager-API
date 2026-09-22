const taskStore = require('../data/taskStore');

function getTasks(req, res) {
    return res.json(taskStore.tasks);
}

function getTaskById(req, res) {
    let taskId = Number(req.params.id);

    if (Number.isNaN(taskId))
        return res.status(400).json({
            message: 'ID must be a number'
        });

    let task = taskStore.tasks.find(function(oneTask) {
        return oneTask.id === taskId;
    });

    if (task === undefined)
        return res.status(404).json({
            message: 'Task not found'
        });

    return res.json(task);
}

function createTask(req, res) {
    if(typeof req.body.title !== 'string' || (req.body.title).trim() ==='')
        return res.status(400).json({message:'Title is required'});
    let title_trim = (req.body.title).trim();
    let newTask ={
        id:taskStore.getNextTaskId(),
        title:title_trim,
        completed:false,
    }
    taskStore.tasks.push(newTask);
    taskStore.saveTasks();
    return res.status(201).json(newTask);
}

module.exports = {
    getTasks: getTasks,
    getTaskById: getTaskById,
    createTask: createTask
};