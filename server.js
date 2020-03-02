const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.envPORT || 4000;
const db = require('./models');
const routes = require('./routes');


// Serve Public Assets
app.use(express.static(__dirname + '/public'));

// Init BodyParser
app.use(bodyParser.json());

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
app.use('/', routes.views);
app.use('/api', routes.api);

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));