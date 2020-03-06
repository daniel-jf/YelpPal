const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./models');
const routes = require('./routes');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());


app.use((req,res,next) => {
    const url = req.url;
    const method = req.method;
    const requestedAt = new Date().toLocaleTimeString();
    const result = `${method} ${url} ${requestedAt}`;
  
    next();
});

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

app.use('/', routes.views);
app.use('/api', routes.api);

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));