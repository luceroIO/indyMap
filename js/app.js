'use strict';

//Map 
var mapTitle = "Indianapolis";
var mapCordinates = {lat:39.797500, lng:-86.166390};
//not a fan of 13 but its a solid choice
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
var Location = function(data){
	var self = this
  this.title = ko.observable(data.title);
  this.category = ko.observable(data.category);
  this.gCordinates = ko.observable(data.gCordinates);
	
	this.marker = new google.maps.Marker({
		cordinates: self.gCordinates(),
		title: self.title()
	});

	google.maps.event.addListener(self.marker, 'click', function(){
		//This will run functions with the marler is clicked
});

	//will need map variable for marker.setMap 

};


var ViewModel = function(){
  var self = this;
  //capturing the value that InitMap returns
  this.map= initMaP()
  //creating an array list to house location data 
  this.allLocations = ko.observableArray([]);
  // appends  all location data into the observble Array
  locations.forEach(function(data){
  	self.allLocations.push(new Location(data))
	});
};


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


