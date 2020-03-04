console.log("sanity test");
const API_BASE = '/api';
const reviewSection = document.querySelector('#reviewSection');
const restaurantId = window.location.pathname.split('/')[2];
// console.log(restaurantId);

const getRestaurant = () => {
	fetch(`${API_BASE}/restaurants/${restaurantId}`)
		.then((buffer) => buffer.json())
		.then((data) => {
			console.log(data.reviews);
			render(data.reviews);
		})
		.catch((err) => console.log(err))
}

getRestaurant()

function render(reviewsArr) {
	const reviewsTemplates = reviewsArr.map((review) => {
		return getReviewsTemplate(review);
	}).join('');

	reviewSection.insertAdjacentHTML('beforeend', reviewsTemplates);
}


	// description: String,
	// datePosted: Date,
	// rating: Number,
	// postedBy: String

const getReviewsTemplate = review => {
	let rating = '<i class="fas fa-star"></i>'
	for(let i = 1; i < 5; i++) {
		if (i < review.rating) {
			rating += '<i class="fas fa-star"></i>'
		}
		else
			rating += '<i class="far fa-star"></i>'
	}
	console.log("rating = ", rating)
	return `
       <div class="row">
         <div class="col-3 border-bottom my-3">
          <img id="avatar" src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" class="img-thumbnail">
          <p class="mb-0">${review.postedBy}</p>
          <p>3/4/20</p>
         </div>
         <div class="col-9">
         	${rating}
            <p class="lead">rating: ${review.rating}/5</p>
            <p class="lead">Date Posted: ${review.datePosted}</p>
            <p class="font-weight-bold lead">${review.description}</p>
         </div>
       </div> 
	`;
};