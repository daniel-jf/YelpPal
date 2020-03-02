const db = require('../models');

const index = (req, res) => {
	db.Restaurant.find({}, (err, ) => {
        if (err) return res.json(err);
        res.json();
    });
};

const show = (req, res) => {
    db.Restaurant.findById(req.params.restaurantId, (err, foundReview) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
  	res.json(foundReview.reviews.id(req.params.reviewId))
    });
};

const create = (req, res) => {
	db.Restaurant.findById(req.params.id, (err, foundRestaurant) => {
    	if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    	foundRestaurant.reviews.push(req.body);
    	console.log(foundRestaurant);
    	foundRestaurant.save((err, savedReview) => {
    		if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    		res.json(savedReview)
    	});
	});
};

const update = (req, res) => {
    db.Restaurant.findById(req.params.restaurantId, (err, foundRestaurant) => {
        if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
        
        foundRestaurant.reviews.forEach((review, index) => {
            if (review._id == req.params.reviewId) {
                foundRestaurant.reviews[index] = {...foundRestaurant.reviews[index], ...req.body};
                foundRestaurant.save((err, updatedRestaurant) => {
                    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
                    res.json(foundRestaurant);
                })
            };
        });
    });
};

const destroy = (req, res) => {
	db.Restaurant.findById(req.params.restaurantId, (err, foundRestaurant) => {
    	if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
		foundRestaurant.reviews = foundRestaurant.reviews.filter(review => {
            return review._id != req.params.reviewId;
		});
		foundRestaurant.save((err, savedRestaurant) => {
    		if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
            res.json(savedRestaurant.reviews.id(req.params.reviewId));
		})
	});
};

module.exports = {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
}