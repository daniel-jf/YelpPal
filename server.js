const monggose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 4000;
const db = require('./models');


app.get('/', (req,res) =>{
    res.send('We made it here');
    console.log('server works');
});



app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));