const db = require('../models');
// TEMPLATE:
// const index = (req, res) => {
//     // We access our datbase through the db variable
//     db.Restaurant.find({})
//       .populate('posts.user', 'firstName lastName _id')
//       .exec((err, foundCities) => {
//         if (err) return res.json(err);
    
//         res.json(foundCities);
//       });
// };
