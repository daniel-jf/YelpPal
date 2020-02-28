const db = require('../models');

const index = (req,res) => {
    db.Restaurant.find({})
        .populate('restaurants.name', 'name foodtype')
        .exec((err, allRestaurants) =>{
            if (err) return res.json(err);
            res.json(allRestaurants);
    });
}

const show = (req, res) => {
    db.Restaurant.findById(req.params.id, (err, restaurantPage) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
  
    res.json(restaurantPage);
    });
    console.log()
};

const create = (req, res) => {
    console.log(req.body); 

    db.Restaurant.create(req.body, (err, addRestaurant) => {
    if (err) return res.json(err);

    res.json(addRestaurant);
    });
};

module.exports = {
    index: index,
    show: show,
    create: create,
}