console.log("sanity test");
const restaurantElement = document.querySelector('#restaurant');
const photoForm = document.querySelector('#photoModal');
// Creating map on page
let map;
map = new google.maps.Map(document.getElementById('map'), 
  	{center: {lat: 37.790882, lng: -122.401552},
 	zoom: 14
 });


//event listneners

fetch('/api/restaurants')
	.then((buffer) => buffer.json())
	.then((data) => {
		console.log(data);
		render(data);
	})
	.catch((err) => console.log(err));


function render(restaurantsArr) {
	const restaurantTemplates = restaurantsArr.map((restaurant) => {
		createMarkers(restaurant);
		return getRestaurantTemplate(restaurant);
	}).join('');

	restaurantElement.insertAdjacentHTML('beforeend', restaurantTemplates);
}

// converting address to long and lat for google markers using google geocode api
const createMarkers = restaurant => {
	fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${restaurant.address}&key=AIzaSyCQMx6LmjsrCo30Uz6ExxdvDsOo08gv-Xk`)
		.then((buffer) => buffer.json())
		.then((data) => {
			let coords = {
				lat: data.results[0].geometry.location.lat,
				lng: data.results[0].geometry.location.lng
			};
			let marker = new google.maps.Marker({position: coords, map: map});
	})
	.catch((err) => console.log(err));
};




const getRestaurantTemplate = restaurant => {
	return `
	<div class="col-md-4">
          <div class="card mb-4 shadow-sm">
          	<img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}">
            <div class="card-body">
              <h5 class="card-text mb-1">${restaurant.name}</h5>
              <p class="card-text mb-1">Crusine: ${restaurant.foodType}</p>
              <p class="card-text mb-1">Photos: ${restaurant.photos.length}</p>
              <p class="card-text mb-1">Reviews: ${restaurant.reviews.length}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a href="/api/restaurants/${restaurant._id}" class="btn btn-primary float-right">View</a>
                  <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#exampleModal" id="${restaurant._id}">Add</button>
                </div>

                <small class="text-muted">ratings</small>
              </div>
            </div>
          </div>
        </div>
	`;
};

// const getRestaurantTemplate = restaurant => {
// 	return `
// 	<div class="col-md-4 mb-4">
// 	    <div class="card">
// 	        <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}">
// 	        <div class="card-body">
// 	            <h5 class="card-title">${restaurant.name}</h5>
// 	            <p class="card-text">${restaurant.foodType}</p>
// 	            <a href="/restaurants/${restaurant._id}" class="btn btn-primary float-right">View Photos and Reviews</a>
// 	        </div>
// 	    </div>
// 	</div> 
// 	`;
// };


//Add Restaurant Photo
photoForm.addEventListener('submit', (event) => {
	// event.preventDefault();
	const photoUser = document.querySelector('#photoUser');
	const photoImage = document.querySelector('#photoImage');
	const photoCaption = document.querySelector('#photoCaption');
	// const restaurantId = event.target.id;
	console.log(this);
	console.log("testing")
	// fetch('/api/restaurants/:id')

})























