const taskStore = require('../data/taskStore');

function getTasks(req, res) {
    return res.json(taskStore.getAllTasks());
}

function getTaskById(req, res) {
    let taskId = Number(req.params.id);

    if (Number.isNaN(taskId))
        return res.status(400).json({
            message: 'ID must be a number'
        });

    let task = taskStore.getAllTasks().find(function(oneTask) {
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
    taskStore.getAllTasks().push(newTask);
    taskStore.saveTasks();
    return res.status(201).json(newTask);
}

function updateTask(req, res) {
    let taskId = Number(req.params.id);
    if (Number.isNaN(taskId))
        return res.status(400).json({message:'ID must be a number'});
    let task = taskStore.getAllTasks().find(function(ele){
        return ele.id === taskId;});
    if (task === undefined)
        return res.status(404).json({message:'cant find the id'});
    if (typeof req.body.completed !== 'boolean')
        return res.status(400).json({message:'Completed must be a boolean'});
    task.completed = req.body.completed;
    taskStore.saveTasks();
    return res.json(task);
}
function deleteTask(req, res) {
    let taskId = Number(req.params.id);
    if (Number.isNaN(taskId))
        return res.status(400).json({message:'ID must be a number'});
    let task = taskStore.getAllTasks().findIndex(function(element){
        return taskId === element.id
    });
    if(task === -1)
        return res.status(404).json({message:'Task not found'});
    let deletedTask = taskStore.tasks.splice(task,1)[0];
    taskStore.saveTasks();
    return res.json(deletedTask);
}
module.exports = {
    getTasks: getTasks,
    getTaskById: getTaskById,
    createTask: createTask,
    updateTask:updateTask,
    deleteTask: deleteTask
};