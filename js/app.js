"use strict";
//Map
var mapTitle = "Indianapolis, IN";
var mapCordinates = {
  lat: 39.764854,
  lng: -86.168751
};

//Using FOURSQUARE for the API req
var fourSqHelper = "https://api.foursquare.com/v2/venues/search?ll=";
var clientID = "J10A2OQSTX4OYMJ2U2SSANP5BQGWAXMKOLJOKJUU4RTUFCBA";
var clientSecret = "5NTWSWTPJDGTXLG0ELGXP52CFU0UB0HL2GMJVANKDALJKHM0";

var mapZoom = 13;
var infoWindow;
//User"s search input
var searchInput = ko.observable("");

//Markers
var locations = [{
    title: "Thristy Scholar",
    category: "Coffee",
    gCordinates: {
      lat: 39.788438,
      lng: -86.155518
    },
    vCordinates: "39.788438,-86.155518"
  }, {
    title: "Yatz",
    category: "Restaurant",
    gCordinates: {
      lat: 39.779446,
      lng: -86.142430
    },
    vCordinates: "39.779446,-86.142430"
  }, {
    title: "Invoke Studio",
    category: "Yoga",
    gCordinates: {
      lat: 39.781054,
      lng: -86.149882
    },
    vCordinates: "39.781054,-86.149882"
  }, {
    title: "Nada",
    category: "Restaurant",
    gCordinates: {
      lat: 39.765753,
      lng: -86.158530
    },
    vCordinates: "39.765753, -86.158530"
  }, {
    title: "Dorman Street",
    category: "Bar",
    gCordinates: {
      lat: 39.779312,
      lng: -86.138810
    },
    vCordinates: "39.779312, -86.138810"
  }

];

//creating observable location data
// will need location  and map data for marker.setMap()
var Location = function(data, map) {
  var self = this;
  this.title = ko.observable(data.title);
  this.category = ko.observable(data.category);
  this.gCordinates = ko.observable(data.gCordinates);
  this.vCordinates = ko.observable(data.vCordinates);
  this.content = "<h3>" + self.title() + "</h3>";

  this.marker = new google.maps.Marker({
    position: self.gCordinates(),
    // looked up  Google Marker Animations
    animation: google.maps.Animation.DROP,
    title: self.title()
  });

  this.fourSqURL = fourSqHelper + self.vCordinates() + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20170816";


  google.maps.event.addListener(self.marker, "click", function() {
    self.toggleBounce();
    self.infoMagic();
  });


  $.ajax({
    url: self.fourSqURL,
    dataType: "json"
  }).done(function(data) {
    self.content = "<div class=\"infoBox\"> <a target=\"_blank\" href=\"https://foursquare.com/v/" + data.response.venues[0].id + "\">" +
      data.response.venues[0].name + "</a>" + "<div>" + data.response.venues[0].location.formattedAddress + "</div></div>";
  }).fail(function() {
    alert("FourSquare api has failed");
  });

  //
  this.infoMagic = function() {
    infoWindow.setContent(self.content);
    infoWindow.open(map, self.marker);
  };

  this.toggleBounce = function() {
    if (self.marker.getAnimation() !== null) {
      self.marker.setAnimation(null);
    } else {
      self.marker.setAnimation(google.maps.Animation.BOUNCE);
      //Using window setTimeout() method to call or
      //evaluate an expression after a specified milliseconds
      setTimeout(function() {
        self.marker.setAnimation(null);
      }, 2300);
    }
  };

  //will need map variable for marker.setMap(map)
  //this adds the marker .  marker.setMap(null) removes the
  //maker . Now  a condictional can be used  on a boolean to control
  // removing or adding the marker

  this.markerOnMap = ko.computed(function() {
    //The indexOf() method returns the first index at which
    // a given element can be found in the array, or -1 if it is not present.
    if (searchInput().length > 0) {
      // returns a value of false if  location title is not in the searchInput
      return (self.title().toLowerCase().indexOf(searchInput().toLowerCase()) > -1);
    } else {
      return true;
    }
  });


  this.markerGod = ko.computed(function() {
    if (self.markerOnMap()) {
      self.marker.setMap(map);
    } else {
      self.marker.setMap(null);
    }
  });

};


var ViewModel = function() {
  var self = this;
  this.mapTitle = ko.observable(mapTitle);
  //capturing the value that InitMap returns
  this.map = initMap();
  //creating an array list to house location data
  this.allLocations = ko.observableArray([]);
  // appends  all location data into the observble Array
  locations.forEach(function(data) {
    var addLocation = new Location(data, self.map);
    self.allLocations.push(addLocation);

  });

  //Need to have my locations that are in the search Input stored
  this.searchLocations = ko.computed(function() {
    var inSearch = [];
    self.allLocations().forEach(function(lData) {
      if (lData.markerOnMap()) {
        inSearch.push(lData);
      }
    });
    return inSearch;
  });

  this.listClicker = function(ldata, click) {
    ldata.toggleBounce();
    ldata.infoMagic();
  };
};



function initMap() {
  //I dont have to define map here I can simple use
  //return [[expression]];
  //The return statement ends function execution and specifies
  //a value to be returned to the function caller, which is
  //the map variable in the ViewModel
  return new google.maps.Map(document.getElementById("map"), {
    center: mapCordinates,
    zoom: mapZoom
  });
};

//
function gError() {
  alert("Google is not perfect, request error.....")
}

//
function indyMap() {
  infoWindow = new google.maps.InfoWindow();
  ko.applyBindings(new ViewModel());
}
