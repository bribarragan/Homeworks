// from data.js
var tableData = data;

// build table

var table = d3.select("tbody");

function dataMe (array) {

array.forEach(function(item){
   var row = table.append("tr");
   Object.entries(item).forEach(function([key, value]){
    var cell = row.append("td")
    cell.text(value);
    });
});
};

dataMe(tableData);

//filter data

function handleClick(){

d3.select("#filter-btn").on("click", function() {

// Prevent the page from refreshing
d3.event.preventDefault();

// remove old table data
d3.selectAll('td').remove();


// Get the value property of the input element
var inputValue = d3.select("#datetime").property("value");
console.log(inputValue);

// Create Filtered dataset based on InputValue entered by user
var filterData = tableData.filter(item => item.datetime === inputValue);
console.log(filterData);


// Build new UFO Table with the filtered subset of UFO Sighting data

dataMe(filterData);

});
};

handleClick();

