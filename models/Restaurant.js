const mongoose = require('mongoose');
const Restaurant = require('./Restaurant');
const Review = require('./Review');
const Photo = require('./Photo');


const restaurantSchema = new mongoose.Schema({
	name: String,
	foodType: String,
	photos: [Photo.schema],
	reviews: [Review.schema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);