const express = require('express');
const router = express.Router();
const taskStore = require('../data/taskStore');

router.get('/',function(req,res){
    res.json(taskStore.tasks);
});



module.exports = router;