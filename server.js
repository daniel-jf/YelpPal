const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.envPORT || 4000;
const db = require('./models');
const routes = require('./routes');

//REQUEST LOGGER MIDDLEWEAR
app.use((req,res,next) => {
    const url = req.url;
    const method = req.method;
    const requestedAt = new Date().toLocaleTimeString();
  
    const result = `${method} ${url} ${requestedAt}`;
  
    console.log(result);
  
    next();
});
  
const TEMP_RESTAURANTS = [
    {name: 'Subway', description: 'sandwiches'},
    {name:'Amazon Go', description: 'grocery store'},
    {name: 'Chipotle', description: 'Mexican'},
    {name: 'Sushirito', description: 'sushi burritos'}
];

//ROUTERS
app.use('/', routes.views);

app.use('/api', routes.api);

app.get('/restaurant', (req,res) => {
    res.json(TEMP_RESTAURANTS);
    console.log('in restaurants page');
});

app.get('/restaurant/:name', (req, res) => {
    let result;
    TEMP_RESTAURANTS.forEach((restaurant) => {
        if (restaurant.name == req.params.name) {
            result = restaurant;
        }
    })
    res.json(result);
});


app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));