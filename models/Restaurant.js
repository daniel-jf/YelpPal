const mongoose = require('mongoose');
const Restaurant = require('./Restaurant');
const Review = require('./Review');

const restaurantSchema = new mongoose.Schema({
	name: String,
	foodType: String,
	photos: [String],
	reviews: [Review.schema]
});