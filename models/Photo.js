const mongoose = require('mongoose');
const User = require('./User');

const photoSchema = new mongoose.Schema({
	image: String,
	caption: String,
	postedBy: String
}, {timestamps: true});

module.exports = mongoose.model('Photo', photoSchema);