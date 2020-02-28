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

module.exports = router;