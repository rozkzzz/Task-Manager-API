const express = require('express');
const cors = require('cors');
const app  = express();
const port = 3000;

const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use(cors());
app.use('/tasks',taskRoutes);

app.listen(port,function(){
    console.log('server is on');
});