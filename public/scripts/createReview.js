document.querySelector('form').addEventListnener('submit', createReview);
const reviewsContainer = document.querySelector('#reviews');

function createReview(e) {
	e.prevent.Default();
	const title = document.querySelector('#title').value;
	const body = document.querySelector('#body').value;
	const newReview = {title, body};
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'Post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newReview);
	})
	.then(stream => stream.json())
	.then(res => render(res))
};


function render(review) {
	reviews.Container.insertAdjacentHTML('beforeend', getReviewTemplate(review));
}


function getReviewTemplate(review) {
	return `
		<div class="review">
			<p>${review.title}</p>
			<p>${review.body}</p>
		</div>
	`
}
