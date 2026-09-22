const express = require('express');
const app  = express();
const port = 3000;

const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/tasks',taskRoutes);

app.listen(port,function(){
    console.log('server is on');
});