const API_BASE = '/api';
const addReviewSubmit = document.querySelector('#addReviewSubmit');
const updateReviewSubmit = document.querySelector('#updateReviewSubmit');
const reviewSection = document.querySelector('#reviewSection');
const restaurantId = window.location.pathname.split('/')[2];
let currentReviewId = "";

const getReviews = () => {
	fetch(`${API_BASE}/restaurants/${restaurantId}`)
		.then((buffer) => buffer.json())
		.then((data) => {
			render(data.reviews);
			addDeleteButtonEL();
			addUpdateButtonEL();
		})
		.catch((err) => console.log(err))
}

function render(reviewsArr) {
	const reviewsTemplates = reviewsArr.map((review) => {
		return getReviewsTemplate(review);
	}).join('');

	reviewSection.insertAdjacentHTML('beforeend', reviewsTemplates);
}

const getReviewsTemplate = review => {
	let rating = '<i class="fas fa-star"></i>'
	for(let i = 1; i < 5; i++) {
		if (i < review.rating) {
			rating += '<i class="fas fa-star"></i>'
		}
		else
			rating += '<i class="far fa-star"></i>'
	}
	return `
       <div class="row" >
         <div class="col-3 border-bottom my-3">
          <img id="avatar" src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" class="img-thumbnail">
          <p class="mb-0 lead">${review.postedBy}</p>
         </div>
         <div class="col-9">
         	${rating}
            <p class="lead">rating: ${review.rating}/5</p>
            
            <p class="font-weight-bold lead">${review.description}</p>
            <button class="deleteButton btn btn-danger" id="${review._id}">Delete</button>
            <button class="updateButton btn btn-primary" id="${review._id}">Edit</button>
         </div>
       </div> 
	`;
};
//------------   Update Review  -------------------------
const addUpdateButtonEL = () => {
	const updateButtons = document.querySelectorAll('.updateButton');
		updateButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				$('#updateReviewModal').modal('show');
				currentReviewId = button.id;
			});

		});
};

//--------Update review Modal form event listener--------------
updateReviewSubmit.addEventListener('click', (e) => {
	e.preventDefault();
	const description = document.querySelector('#updateDescription');
	const postedBy = document.querySelector('#updatePostedBy');
	const rating =  document.querySelector('#updateRating');
	let formIsValid = true;

	//reset validation
	description.classList.remove("is-invalid")
	rating.classList.remove("is-invalid")
	postedBy.classList.remove("is-invalid")

	//check if form is valid	
	if (!description.value) {
		description.classList.add("is-invalid");
		formIsValid = false;
	};
	if (!postedBy.value) {
		postedBy.classList.add("is-invalid");
		formIsValid = false;
	}
	if (!rating.value || rating.value.length > 1 || !(rating.value >= 1 && rating.value <=5)) {
		rating.classList.add("is-invalid")
		formIsValid = false;
	}
	// run if valid
	if (formIsValid) {
		const newReview = {
			postedBy: postedBy.value,
			rating: rating.value,
			description: description.value,
			datePosted: Date.now()
		};
		//Create Review onto Database
		fetch(`/api/restaurants/${restaurantId}/reviews/${currentReviewId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newReview)
		})
			.then((buffer) => buffer.json())
			.then((res) => {
				$('#addReviewModal').modal('hide');
				location.reload();
			})
			.catch((err) => console.log(err));
	}
})

// -------Add review Modal form event listener---------------
addReviewSubmit.addEventListener('click', (e) => {
	e.preventDefault();
	const description = document.querySelector('#description');
	const postedBy = document.querySelector('#postedBy');
	const rating =  document.querySelector('#rating');
	let formIsValid = true;

	//reset validation
	description.classList.remove("is-invalid")
	rating.classList.remove("is-invalid")
	postedBy.classList.remove("is-invalid")

	//check if form is valid	
	if (!description.value) {
		description.classList.add("is-invalid");
		formIsValid = false;
	};
	if (!postedBy.value) {
		postedBy.classList.add("is-invalid");
		formIsValid = false;
	}
	if (!rating.value || rating.value.length > 1 || !(rating.value >= 1 && rating.value <=5)) {
		rating.classList.add("is-invalid")
		formIsValid = false;
	}
	// run if valid
	if (formIsValid) {
		const newReview = {
			postedBy: postedBy.value,
			rating: rating.value,
			description: description.value,
			datePosted: Date.now()
		};
		//Create Review onto Database
		fetch(`/api/restaurants/${restaurantId}/reviews`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newReview),
		})
			.then((buffer) => buffer.json())
			.then((res) => {
				$('#addReviewModal').modal('hide');
				location.reload();
			})
			.catch((err) => console.log(err));
	}
})

//----------Delete Review -----------------------------------

const addDeleteButtonEL = () => {
	const delButtons = document.querySelectorAll('.deleteButton');

	delButtons.forEach((button, index) => {
		button.addEventListener('click', (e) => {
			fetch(`/api/restaurants/${restaurantId}/reviews/${button.id}`, {
				method: 'DELETE',
			})
				.then((buffer) => buffer.json())
				.then((data) => {
					location.reload()
				})
				.catch((err) => console.log(err))
		});
	});
};


//---------- run on page load-------------------------
getReviews()
