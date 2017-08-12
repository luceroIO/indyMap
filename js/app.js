'use strict';

//Map 
var mapTitle = "Indianapolis";
var mapCordinates = {lat:39.797500, lng:-86.166390};
//not a fan of 13 but its a solid choice here
var mapZoom = 13;

//Markers
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

//creating observable location data
// will need location  and map data for marker.setMap()
var Location = function(data, map){
	var self = this
  this.title = ko.observable(data.title);
  this.category = ko.observable(data.category);
  this.gCordinates = ko.observable(data.gCordinates);
	
	this.marker = new google.maps.Marker({
		cordinates: self.gCordinates(),
		title: self.title()
	});

	google.maps.event.addListener(self.marker, 'click', function(){
		//This will run functions when the marker is clicked
	});

	//will need map variable for marker.setMap(map)
	//this adds the marker .  marker.setMap(null) removes the
	//maker . Now  a condictional can be used  on a boolean to control 
	// removing or adding the marker
	
	this.markerOnMap = ko.computed(function() {
		//need to have the search input determine to the value
		//The indexOf() method returns the first index at which
		// a given element can be found in the array, or -1 if it is not present.
  	if (searchInput().length > 0){
  	// returns a value of false if  location title is not in the searchInput
  		return(self.title().toLowerCase().indexOf(searchInput().toLowerCase()) > -1);
  	} else{
  		return true
  	}
  });


	this.markerGod = ko.computed(function(){
		if (self.markerOnMap()) {
			self.marker.setMap(map);
		} else{
			self.marker.setMap(null);
		}

	});


};


ViewModel = function(){
  var self = this;
  //capturing the value that InitMap returns
  this.map= initMaP()
  //creating an array list to house location data 
  this.allLocations = ko.observableArray([]);
  // appends  all location data into the observble Array
  locations.forEach(function(data){
  	var addLocation = new Location(data, self.map);
  	self.allLocations.push(addLocation);
	});

	//Need to have my locations that are in the search Input stored
	this.searchLocations = ko.computer(function(){
		var inSearch = [];
		self.allLocations().forEach(function(location){
			if(location.markerOnMap()) {
				inSearch.push(location);
			}
		});
		return inSearch;
	});
}


function initMap() {
	//I dont have to define map here I can simple use 
	//return [[expression]]; 
	//The return statement ends function execution and specifies
	//a value to be returned to the function caller, which is 
	//the map variable in the ViewModel

	return new google.maps.Map(document.getElementById('map'), {
		center: mapCordinates,
		zoom: mapZoom
	});
};

//
function indyMap(){
	//need a place to apply my bindings
  ko.applyBindings(new ViewModel());
}


