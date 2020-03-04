const mongoose = require('mongoose');
const User = require('./User');

const reviewSchema = new mongoose.Schema({
	description: String,
	datePosted: Date,
	rating: Number,
	postedBy: String
});

module.exports = mongoose.model('Review', reviewSchema);