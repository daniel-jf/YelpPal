const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const db = require('./models');

//ROUTERS
app.get('/', (req,res) =>{
    res.send('We made it here');
    console.log('server works');
});




app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));