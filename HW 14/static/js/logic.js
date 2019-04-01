function getColor(d) {
  return d > 5 ? '#800026' :
          d > 4 ? '#E31A1C' :
          d > 3  ? '#FC4E2A' :
          d > 2   ? '#FEB24C' :
          d > 1   ? '#FED976' :
                    '#FFEDA0';
}

// Creating map object
var myMap = L.map("map", {
  center: [36.9915, -119.7889],
  zoom: 6
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(myMap);


// Assemble API query URL
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Grab the data with d3
d3.json(url, function(data){
  console.log(data.features)
  var point = data.features

  // Loop through data
for(i=0; i< point.length; i++){
  // Set the data location property to a variable
  var location = point[i].geometry.coordinates;

  // Add a new marker to the cluster group and bind a pop-up
  L.circle([location[1],location[0]], {
    stroke: false,
    fillOpacity: 0.75,
    color: "black",
    fillColor: getColor(point[i].properties.mag),
    radius: (point[i].properties.mag)*8000
  }).addTo(myMap)
    .bindPopup(`Location: ${point[i].properties.place}<hr> Magnitude: ${point[i].properties.mag}`);

}
var legend = L.control({ position: 'bottomright' })
legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend'),
grades = [0, 1, 2, 3, 4, 5],
labels = [];

// loop through our density intervals and generate a label with a colored square for each interval
for (var i = 0; i < grades.length; i++) {
div.innerHTML +=
    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}
return div;

}

legend.addTo(myMap);
})





// var div = L.DomUtil.create('div', 'info legend'),
// grades = [0, 1, 2, 3, 4, 5, 10],
// labels = [];

// // loop through our density intervals and generate a label with a colored square for each interval
// for (var i = 0; i < grades.length; i++) {
// div.innerHTML +=
//     '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//     grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
// }
// return div;

// get colors 
  // if (point[i].properties.mag < 1){
  //   color = "green"
  // }
  // else if (point[i].properties.mag < 2){
  //   color = "#9ACD32"
  // }
  // else if (point[i].properties.mag < 3){
  //   color = "yellow"
  // }
  // else if (point[i].properties.mag < 4){
  //   color = "orange"
  // }
  
  // else if (point[i].properties.mag <5){
  //   color ="#FF4500"
  // }
  // else {color = "red"}
  // Check for location property