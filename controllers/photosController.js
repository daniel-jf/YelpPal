const db = require('../models');


const index = (req, res) => {
	db.Restaurant.findById(req.params.restaurantId, (err, restaurants) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    res.json(restaurants.photos);
	});
};

const show = (req, res) => {
	db.Restaurant.findById(req.params.restaurantId, (err, foundRestaurant) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

	foundRestaurant.photos.forEach((photo, index) => {
		if (photo._id == req.params.photoId) {
			res.json(photo);
		};		
	});
	});
};

const create = (req, res) => {
	db.Restaurant.findById(req.params.id, (err, foundRestaurant) => {
    	if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    	foundRestaurant.photos.push(req.body);
    	console.log(foundRestaurant);
    	foundRestaurant.save((err, savedRestaurant) => {
    		if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    		res.json(savedRestaurant)
    	})
	})	
}

const update = (req, res) => {

};

const destroy = (req, res) => {
	db.Restaurant.findByIdAndDelete(req.params.photoId, (err, destroyedPhoto) => {
    	if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
		res.json(destroyedPhoto);

	})
};

module.exports = {
	index,
	show,
	create,
	update,
	destroy
}