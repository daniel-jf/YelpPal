const mongoose = require('mongoose');
const User = require('./User');

const photoSchema = new mongoose.Schema({
	image: String,
	datePosted: Date,
	caption: String,
	postedBy: String
});

module.exports = mongoose.model('Photo', photoSchema);