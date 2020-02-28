const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const db = require('./models');

//REQUEST LOGGER MIDDLEWEAR
app.use((req,res,next) => {
    const url = req.url;
    const method = req.method;
    const requestedAt = new Date().toLocaleTimeString();
  
    const result = `${method} ${url} ${requestedAt}`;
  
    console.log(result);
  
    next();
});
  

//ROUTERS
app.get('/', (req,res) =>{
    res.send('We made it here');
    console.log('server works');
});




app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));