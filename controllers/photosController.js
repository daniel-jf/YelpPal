const db = require('../models');


const index = (req, res) => {
	db.Restaurant.findById(req.params.id, (err, restaurants) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
 
    res.json(restaurants);
	});
};

// const index = (req, res) => {
// 	db.Restaurant.findById(req.params.id)
// 		.populate('photos')
// 		.exec((err, restaurants) => {
//     if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
//     res.json(restaurants);

// 	})
// };




// returns an Array
// const show = (req, res) => {
// 	db.Restaurant.findById(req.params.restaurantId, (err, foundRestaurant) => {
//     	if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
// 		let foundPhoto = foundRestaurant.photos.filter((photo) => {
// 			return photo._id == req.params.photoId;
// 	});
// 	res.json(foundPhoto);
// });
// };


// returns an object
const show = (req, res) => {
	db.Restaurant.findById(req.params.restaurantId, (err, foundRestaurant) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
	foundRestaurant.photos.forEach((photo, index) => {
		if (photo._id == req.params.photoId) {
			res.json(photo);
			return ;
		};		
	});
	});
};


const create = (req, res) => {
	db.Restaurant.findById(req.params.id, (err, foundRestaurant) => {
    	if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    	db.Photo.create(req.body, (err, newPhoto) => {
    		foundRestaurant.photos.push(newPhoto);
    	})

    	console.log(foundRestaurant);
    	foundRestaurant.save((err, savedRestaurant) => {
    		if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    		res.json(savedRestaurant.photos);
    	})
	})	
}

// const create = (req, res) => {
// 	db.Restaurant.findById(req.params.id, (err, foundRestaurant) => {
//     	if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
//     	foundRestaurant.photos.push(req.body);
//     	console.log(foundRestaurant);
//     	foundRestaurant.save((err, savedRestaurant) => {
//     		if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
//     		res.json(savedRestaurant.photos);
//     	})
// 	})	
// }


//
const update = (req, res) => {
	db.Restaurant.findById(req.params.restaurantId, (err, foundRestaurant) => {
    	if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

		foundRestaurant.photos.forEach((photo, index) => {
			if (photo._id == req.params.photoId) {
				// console.log(photo);
				photo = {...photo, ...req.body};
				console.log(photo);
				return ;
			};
		});
		foundRestaurant.save((err, updatedRestaurant) => {
    		if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    		console.log(foundRestaurant);
    		res.json(foundRestaurant);
		})
	})
};

//creating new array using filter to exclude the photo that nereds to be deleted and assigning new array to the old array
const destroy = (req, res) => {
	db.Restaurant.findById(req.params.restaurantId, (err, foundRestaurant) => {
    	if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
		// res.json(foundRestaurant);
		foundRestaurant.photos = foundRestaurant.photos.filter(photo => {
			return photo._id != req.params.photoId;
		});
		// foundRestaurant.photos = newPhotos;
		foundRestaurant.save((err, savedRestaurant) => {
    		if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
			res.json(savedRestaurant.photos);
		})
		// res.json(foundRestaurant.photos);

	});
};

module.exports = {
	index,
	show,
	create,
	update,
	destroy
}