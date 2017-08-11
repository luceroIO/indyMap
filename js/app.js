'use strict';

// map variable is need for google maps initMap function
var map;

//Map 
var mapTitle = ko.observable("Indianapolis");
var mapCordinates = {lat:39.797500, lng:-86.166390};
var mapZoom = 13;

/*
var Location = function(){
	var self = this;
	self.title = ko.observable();
	self.category = ko.observable();
	self.lat= ko.observable();
	self.lng = ko.observable();// typeof is NAN
	// having trouble  getting the lat and lat variables to parse correct , data type is NAN....
	//self.cordinates = {lat: self.lat, lng: self.lng};
};


// This is not working 
var locationData = [
	new Location().title("Thristy Scholar").category("Coffee").lat(39.788438).lng(-86.155518),
	new Location().title("Yatz").category("Restaurant").lat(39.779446).lng(-86.142430),	
	new Location().title("Invoke Studio").category("Yoga").lat(39.781054).lng(-86.149882),
	new Location().title("Nada").category("Restaurant").lat(39.765753).lng(-86.158530),
	new Location().title("Dorman Street").category("Bar").lat(39.779312).lng(-86.138810)
];

*/

var locations =[
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



var ViewModel = function(){



};

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: mapCordinates,
		zoom: mapZoom
	});

	//Creates a new bounds based on a southwest and a northeast corner.
	//need to figure out how to use it 
	var bounds = new google.maps.LatLngBounds();

	//creates a marker for each location
  for(var i=0; i < locations.length; i++){
    var cordinates = locations[i].gCordinates;
    var title = locations[i].title;
    var marker = new google.maps.Marker({
      position: cordinates,
      title: title,
      id: i
    });

    //adding the marker data to the location indexes
    locations[i].gMarker = marker;

		// To add the marker to the map, call setMap();
    marker.setMap(map);
    //removes marker from map
    //marker.setMap(null);

	};
};






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
