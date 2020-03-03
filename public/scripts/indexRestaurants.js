console.log("sanity test");
const restaurantElement = document.querySelector('#restaurant');

//testing map
let map;
map = new google.maps.Map(document.getElementById('map'), 
  	{center: {lat: 37.790882, lng: -122.401552},
 	zoom: 14
 });

fetch('/api/restaurants')
	.then((buffer) => buffer.json())
	.then((data) => {
		console.log(data);
		render(data);
	})
	.catch((err) => console.log(err));




function render(restaurantsArr) {
	const restaurantTemplates = restaurantsArr.map((restaurant) => {
		// console.log(restaurant.address)
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${restaurant.address}&key=AIzaSyCQMx6LmjsrCo30Uz6ExxdvDsOo08gv-Xk`)
			.then((buffer) => buffer.json())
			.then((data) => {
				console.log(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
				let coords = {
					lat: data.results[0].geometry.location.lat,
					lng: data.results[0].geometry.location.lng
				}
				let marker = new google.maps.Marker({position: coords, map: map});
		})
		.catch((err) => console.log(err));
		return getRestaurantTemplate(restaurant);
	}).join('');

	restaurantElement.insertAdjacentHTML('beforeend', restaurantTemplates);
	//testing markers
	// console.log(restaurant)

}

//const apiKey = &key=AIzaSyCQMx6LmjsrCo30Uz6ExxdvDsOo08gv-Xk;


// adding markers to map
// let coordsObject = {
// 	lat: coords[1],
// 	lng: coords[0]
// }
// // let marker = new google.maps.Marker({position: {lat: coords[1], lng: coords[0]}, map: map});
// let marker = new google.maps.Marker({position: coordsObject, map: map});


const populateMap = restaurant => {
	return `


	`
}




const getRestaurantTemplate = restaurant => {
	return `
	<div class="col-md-4">
          <div class="card mb-4 shadow-sm">
          	<img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}">
            <div class="card-body">
              <p class="card-text">This restaurant serves ${restaurant.foodType} Food</p>
              <p class="card-text">Photos = ${restaurant.photos.length}</p>
              <p class="card-text">Reviews = ${restaurant.reviews.length}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a href="/api/restaurants/${restaurant._id}" class="btn btn-primary float-right">View</a>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Add</button>
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


