const express = require('express');
const router = express.Router();


router.get('/', (req,res) =>{
    res.sendFile('views/index.html', {
        root: __dirname + '/../'
    })
    console.log('server works');
});


router.get('/restaurant/page', (req, res) => {
    res.sendFile('views/restaurant.html', {
      root: __dirname + '/../',
    });
    console.log('Route to restaurant works');
});


// Register Template
router.get('/register', (req, res) => {
	res.sendFile('views/auth/register.html', {
		root: __dirname + '/../',
	});
});


// Login Template
router.get('/login', (req, res) => {
	res.sendFile('views/auth/login.html', {
		root: __dirname + '/../',
	});
});

module.exports = router;