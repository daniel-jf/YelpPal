const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    res.sendFile('views/index.html', {
        root: __dirname + '/../'
    })
    console.log('server works');
});
router.get('/signin', (req,res) =>{
    res.sendFile('views/signIn.html', {
        root: __dirname + '/../'
    })
    console.log('sign in page ');
});
router.get('/signup', (req,res) =>{
    res.sendFile('views/signUp.html', {
        root: __dirname + '/../'
    })
    console.log('sign in page ');
});
router.get('/restaurant/page', (req, res) => {
    res.sendFile('views/restaurant.html', {
      root: __dirname + '/../',
    });
    console.log('Route to restaurant works');
});

module.exports = router;