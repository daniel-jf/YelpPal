const db = require('./models');

const photos = [
{
	image: "https://zabas.com/wp-content/uploads/2014/09/Placeholder-food.jpg",
	caption: "Good Portion",
	postedBy: "dennis"
},
{
	image: "https://zabas.com/wp-content/uploads/2014/09/Placeholder-food.jpg",
	caption: "It was good",
	postedBy: "daniel"
}]

const reviews = [
{
	description: "All Meals have been good",
},
{
	description: "Food took a long time to come"
}]


const restaurants = [
{
	image: "https://zabas.com/wp-content/uploads/2014/09/Placeholder-food.jpg",
	name: "Viva Cafe",
	foodType: "Asian",
	address: "601 Montgomery St Lobby",
	photos: photos,
	reviews: reviews
},
{
	image: "https://zabas.com/wp-content/uploads/2014/09/Placeholder-food.jpg",
	name: "Front Door Cafe",
	foodType: "American",
	photos: photos,
	reviews: reviews
},
{
	image: "https://zabas.com/wp-content/uploads/2014/09/Placeholder-food.jpg",
	name: "Mehfill Indian",
	foodType: "Indian",
	address: "28 2nd st",
	photos: photos,
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




