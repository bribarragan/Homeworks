// from data.js
var tableData = data;

// build table

var table = d3.select("tbody");

function dataMe (arr) {

    data.forEach(function(item){
   var row = table.append("tr");
   Object.entries(item).forEach(function([key, value]){
    var cell = row.append("td")
    cell.text(value);
    });
});
};

dataMe(tableData);

//filter data

d3.select("#filter-btn").on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // remove old table data
    $("tbody").children().remove()
  
    // Get the value property of the input element
    var inputValue = d3.select("#datetime").property("value");
  
    // Create Filtered dataset based on InputValue entered by user
    if (inputValue) {
    var filterdata = tableData.filter(onerec => onerec.datetime === inputValue);}
   
    // Build new UFO Table with the filtered subset of UFO Sighting data

    dataMe(filterdata);
  });

// Aash's blueprint
// function handleClick(){
//     d3.select("#filter-btn").on("click", function(){
//     d3.event.preventDefault();
//     text = d3.select("#datetime").property("value");
//     $("#table_of_items tbody tr").remove()
//     return dataMe(tableData)
// })
// }


// $("#table_of_items tbody tr").remove() removed body of table