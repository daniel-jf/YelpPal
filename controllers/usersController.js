const db = require('../models');

const index = (req, res) => {
	db.User.find({}, (err, users) => {
		if (err) return res.status(400).json({status: 400, error: "Something went wrong, please try again"});
		res.json(users);
	});
};

const show = (req, res) => {
	db.User.findById(req.params.id, (err, foundUser) => {
		if (err) return res.status(400).json({status: 400, error: "Something went wrong, please try again"});
		res.json(foundUser);
	});
};

const create = (req, res) => {
	db.User.create(req.body, (err, createdUser) => {
		if (err) return res.status(400).json({status: 400, error: "Something went wrong, please try again"})
			res.json(createdUser);
	})
}

const update = (req, res) => {
	db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
		if (err) return res.status(400).json({status: 400, error: "Something went wrong, please try again"})
		res.json(updatedUser);
	});
};

const destroy = (req, res) => {
	db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
		if (err) return res.status(400).json({status: 400, error: "Something went wrong, please try again"})
			res.json(deletedUser);
	});
};

module.exports = {
	index,
	show,
	create,
	update,
	destroy
}