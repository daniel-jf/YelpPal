const db = require('../models');

const index = (req, res) => {
	db.Review.find({}, (err, ) => {
        if (err) return res.json(err);
        res.json();
    });
}

const show = (req, res) => {
    db.Review.findById(req.params.id, (err, reviewPage) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
  
    res.json(reviewPage);
    });
};

const create = (req, res) => {
    console.log(req.body); 
    db.Review.create(req.body, (err, addReview) => {
    if (err) return res.json(err);

    res.json(addReview);
    });
};

const update = (req, res) => {
    db.Review.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updateReview) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
  
    res.json(updateReview);
    });
};

const destroy = (req, res) => {
    db.Review.findByIdAndDelete(req.params.id, (err, deleteReview) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
  
    res.json(deleteReview);
    });
};

module.exports = {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
}