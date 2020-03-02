const db = require('../models');

const index = (req, res) => {
	db.Restaurant.find({}, (err, allRestaurants) => {
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

const update = (req, res) => {
    db.Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedRestaurant) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
  
    res.json(updatedRestaurant);
    });
};

const destroy = (req, res) => {
    db.Restaurant.findByIdAndDelete(req.params.photoId, (err, deletedRestaurant) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    console.log(req.params.photoId);

    res.json(deletedRestaurant);
    });
};

module.exports = {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
}