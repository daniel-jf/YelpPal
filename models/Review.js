const mongoose = require('mongoose');
const User = require('./User');

const reviewSchema = new mongoose.Schema({
	description: String,
	datePosted: Date,
	postedBy: User.schema
});

module.exports = mongoose.model('Review', reviewSchema);