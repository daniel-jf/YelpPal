const db = require('./models');


const reviews = [
{
	postedBy:"Dennis",
	rating: 4,
	datePosted: Date.now(),
	description: "All Meals have been good",
},
{
	postedBy:"Daniel",
	rating: 2,
	datePosted: Date.now(),
	description: "Food took a long time to come"
}]


const restaurants = [
{
	image: "https://zabas.com/wp-content/uploads/2014/09/Placeholder-food.jpg",
	name: "Viva Cafe",
	foodType: "Asian",
	address: "601 Montgomery St Lobby",
	reviews: reviews
},
{
	image: "https://zabas.com/wp-content/uploads/2014/09/Placeholder-food.jpg",
	name: "Front Door Cafe",
	foodType: "American",
	address: "1 Front St",
	reviews: reviews
},
{
	image: "https://zabas.com/wp-content/uploads/2014/09/Placeholder-food.jpg",
	name: "Mehfill Indian",
	foodType: "Indian",
	address: "28 2nd st",
	reviews: reviews
}];


const users = [
{
	name: "dennis",
	password: "dennis",
	email: "dennis@email.com"
},
{
	name: "daniel",
	password: "daniel",
	email: "daniel@email.com"
}];


db.Restaurant.create(restaurants, (err, newRestaurants) => {
	console.log("adding new restaurants...")
});

db.User.create(users, (err, newUsers) => {
	console.log("adding new users")
});




