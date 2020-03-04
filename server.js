const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.envPORT || 4000;
const db = require('./models');
const routes = require('./routes');
// Dependency for Auth
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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

//Express Session
app.use(session({
	store: new MongoStore({
		url: process.envMONGOD_URI || 'mongodb://localhost:27017/yelpPal'
	}),
	secret: 'poij34592j9fm9dwo2fo2enf20nvoiwemiweo',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // => Two weeks
	}
}));


//ROUTERS
app.use('/', routes.views);
app.use('/api', routes.api);

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));