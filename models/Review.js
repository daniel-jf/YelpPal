const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	description: String,
	rating: String,
});

module.exports = mongoose.model('Review', reviewSchema);