const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers');

// Path starts at 'localhost:3000/api'

//Restaurant Routes
// router.get('/restaurants', ctrl.restaurants.index);
// router.get('/restaurants/:id', ctrl.restaurants.show);
// router.post('/restaurants/', ctrl.restaurants.create);
// router.put('/restaurants/:id', ctrl.restaurants.update);
// router.delete('/restaurants/:id', ctrl.restaurants.destroy);

// Photo Routes

router.get('/restaurants/:id/photos', ctrl.photos.index);
router.get('/restaurants/:restaurantId/photos/:photoId', ctrl.photos.show);
router.post('/restaurants/:id/photos', ctrl.photos.create);
router.put('/restaurants/:restaurantId/photos/:photoId', ctrl.photos.update);
router.delete('/restaurants/:restaurantId/photos/:photoId', ctrl.photos.destroy);

// User Routes

router.get('/users', ctrl.users.index);
router.get('/users/:id', ctrl.users.show);
router.post('/users/', ctrl.users.create);
router.put('/users/:id', ctrl.users.update);
router.delete('/users/:id', ctrl.users.destroy);

// Review Routes

// router.get('/restaurants/:id/reviews', ctrl.reviews.index);
// router.get('/restaurants/:restaurantId/reviews/:reviewId', ctrl.reviews.show);
// router.post('/restaurants/:id/reviews', ctrl.reviews.create);
// router.put('/restaurants/:restaurantId/reviews/:reviewId', ctrl.reviews.update);
// router.delete('restaurants/:restaurantId/reviews/:reviewId', ctrl.reviews.destroy);

module.exports = router;