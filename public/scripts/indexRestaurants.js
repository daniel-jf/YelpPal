console.log("sanity test");
const restaurantElement = document.querySelector('#restaurant');

fetch('/api/restaurants')
	.then((buffer) => buffer.json())
	.then((data) => {
		console.log(data);
		render(data);
	})
	.catch((err) => console.log(err));


function render(restaurantsArr) {
	const restaurantTemplates = restaurantsArr.map((restaurant) => {
		return getRestaurantTemplate(restaurant);
	}).join('');

	restaurantElement.insertAdjacentHTML('beforeend', restaurantTemplates);	
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


