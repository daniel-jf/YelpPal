let user = JSON.parse(localStorage.getItem('currentUser'));
const restaurantElement = document.querySelector('#restaurant');
const photoForm = document.querySelector('#photoModal');
const signButtons = document.querySelector('#loggedIn');
const logoutButton = document.querySelector('#logOut');
const welcome = document.querySelector('#userWelcome');

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
		createMarkers(restaurant);
		return getRestaurantTemplate(restaurant);
	}).join('');
	restaurantElement.insertAdjacentHTML('beforeend', restaurantTemplates);
}

const createMarkers = restaurant => {
	fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${restaurant.address}&key=AIzaSyCQMx6LmjsrCo30Uz6ExxdvDsOo08gv-Xk`)
		.then((buffer) => buffer.json())
		.then((data) => {
			let coords = {
				lat: data.results[0].geometry.location.lat,
				lng: data.results[0].geometry.location.lng
			};

			let contentString = `
				<h5>${restaurant.name} </h5>
				<p class=".lead">${restaurant.address}</p>
                 <a href="https://www.google.com/maps/place/${restaurant.address}" class="btn btn-primary float-right">Get Direction</a>
                 <a href="/restaurant/${restaurant._id}" class="float-right btn btn-primary mr-2">View</a>

			`;
			let marker = new google.maps.Marker({
				position: coords,
				map: map,
				animation: google.maps.Animation.DROP,
			});

			let infowindow = new google.maps.InfoWindow({
				content: contentString
        	});
        	marker.addListener('click', function() {
        		infowindow.open(map, marker);
        		if (marker.getAnimation() !== null) {
          		marker.setAnimation(null);
        		} else {
          		marker.setAnimation(google.maps.Animation.BOUNCE);
       		 	}
        	});

	})
	.catch((err) => console.log(err));
};


const getRestaurantTemplate = restaurant => {
	return `
	<div class="col-md-4">
          <div class="card mb-4 shadow-sm">
          	<img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}">
            <div class="card-body">
              <p class="card-text mb-1 font-weight-">${restaurant.name}</p>
              <p class="card-text mb-1">Crusine: ${restaurant.foodType}</p>
              <p class="card-text mb-1">Reviews: ${restaurant.reviews.length}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a href="/restaurant/${restaurant._id}" class="btn btn-primary float-right">View</a>
                </div>
              </div>
            </div>
          </div>
        </div>
	`;
};


$(function(){
$('#photoSubmit').on("click",function(e) {
	e.preventDefault();
	const postReview = `/restaurants/${restaurant._id}/reviews`;
		let info = {
			postedBy: $('#photoUser').val(),
			image: $('#photoImage').val(),
			caption: $('#photoCaption').val(),
		}
		info = JSON.stringify(info)
		console.log(info);
		$.ajax({
			type: "POST",
			url: postReview,
			data: info,
			headers:{
				'Content-Type':'application/json'
			},
			success: function(result){
			}
		});
	e.preventDefault();
	});
});

logoutButton.addEventListener('click', () => { 
	  fetch('/api/logout', {
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json',
		  'credentials': 'include',
		},
	  })
		.then((res) => res.json())
		.then((data) => {
		  if (data.status === 200) {
			localStorage.removeItem('currentUser');
			window.location = '/signin';
		}
		console.log(data);
	})
});

if (user){
	signButtons.style.display = "none";
	logoutButton.style.display = "block";
	welcome.style.display = "show";
} else if (!user){
	signButtons.style.display = "block";
	logoutButton.style.display = "none";
	welcome.style.display = "none";
}
const welcomeUser = document.createTextNode(`Welcome, ${user.name}`);
welcome.appendChild(welcomeUser);