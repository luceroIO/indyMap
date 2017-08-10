'use strict';

var map;

var locations =[
	{
		title: 'Indianapolis',
		category: 'City',
		gCordinates: {lat: 39.797500, lng: -86.166390}
	},
	{
		title: 'Thristy Scholar',
		category: 'Coffee',
		gCordinates: {lat: 39.788438, lng: -86.155518}
	},
	{
		title: 'Yatz',
		category: 'Restaurant',
		gCordinates: {lat: 39.779446, lng: -86.142430}
	},
	{
		title: 'Invoke Studio',
		category: 'Yoga',
		gCordinates: {lat: 39.781054, lng: -86.149882}
	},
	{
		title: 'Nada',
		category: 'Restaurant',
		gCordinates: {lat: 39.765753, lng: -86.158530}
	},
	{
		title: 'Dorman Street',
		category: 'Bar',
		gCordinates: {lat: 39.779312, lng: -86.138810}
	}

];



function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: locations[0].gCordinates,
		zoom: 12
	});

}


