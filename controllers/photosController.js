const db = require('../models');


const index = (req, res) => {
	db.Photo.find({}, (err, ) => {
		if (err) return res.status(400).json({status: 400, error: "Something went wrong, please try again"});
		res.json(users);
	});
};

const show = (req, res) => {
	db.Restaurant.find({})
}

const create = (req, res) => {

}

const update = (req, res) => {

};

const destroy = (req, res) => {

};

module.exports = {
	index,
	show,
	create,
	update,
	destroy
}