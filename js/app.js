'use strict';

// map variable is need for google maps initMap function
var map;

//Map 
var mapTitle = ko.observable("Indianapolis");
var mapCordinates = {lat:39.797500, lng:-86.166390};
var mapZoom = 12;

var Location = function(){
	var self = this;
	self.title = ko.observable();
	self.category = ko.observable();
	self.lat = ko.observable();
	self.lng = ko.observable();
	self.cordinates = {lat: self.lat, lng: self.lng};
};

var locationData = [
	new Location().title("Thristy Scholar").category("Coffee").lat(39.788438).lng(-86.155518),
	new Location().title("Yatz").category("Restaurant").lat(39.779446).lng(-86.142430),	
	new Location().title("Invoke Studio").category("Yoga").lat(39.781054).lng(-86.149882),
	new Location().title("Nada").category("Restaurant").lat(39.765753).lng(-86.158530),
	new Location().title("Dorman Street").category("Bar").lat(39.779312).lng(-86.138810)
];



function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: mapCordinates,
		zoom: mapZoom
	});

}






/*
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

*/
