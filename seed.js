const db = require('./models');

const users = [
{
	name: "Dennis",
	password: "pass",
},
{
	name: "Daniel",
	password: "pass",
}];

const restaurants = [
{
	name: "Lily Cafe",
	foodType: "Vegan",
	photos: photos,
	reviews: reviews
},
{
	name: "Viva Cafe",
	foodType: "Asian",
	photos: photos,
	reviews: reviews
}];


const photos = [
{
	image: "https://picsum.photos/300",
	postedBy: "Dennis",
	caption: "Great food"
},
{
	image: "https://picsum.photos/300",
	postedBy: "Daniel",
	caption: "Really good portions"
}
];


const reviews = [
{
	description: "Food was ready and portions are great",
	postedBy: "Dennis"
},
{
	description: "Portion is okay, but food tasted great",
	postedBy: "Daniel"
}];

