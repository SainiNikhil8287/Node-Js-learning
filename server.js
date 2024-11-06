const express = require('express');
const app = express();
const port = 8000;
const db = require('./db');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(port,()=>{
    console.log('server running');
});