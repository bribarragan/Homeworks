// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 650;

var margin = {
    top: 20,
    right: 30,
    bottom: 100,
    left:100
};

var width = svgWidth-margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.right})`);

var chosenXAxis = "poverty";
// function that determines x scale based on chosen x axis
function xScale(censusData, chosenXAxis){
    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
    d3.max(censusData, d => d[chosenXAxis]) * 1.2
  ])
  .range([0, width]);

return xLinearScale;
}


function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(800)
      .call(bottomAxis);
  
    return xAxis;
  }


// function to render circles with new x values
  function renderCircles (circlesGroup, newXscale, chosenXAxis){
      circlesGroup.transition()
        .duration(800)
        .attr("cx", d => newXscale(d[chosenXAxis]))
      return circlesGroup;
  }

  function renderLabels (stateText, newXscale, chosenXAxis){
    stateText.transition()
      .duration(800)
      .attr("dx", d => newXscale(d[chosenXAxis]))
    return stateText;
}
// function to update tooltip
  function updateToolTip(chosenXAxis, circlesGroup){
      if(chosenXAxis === "poverty") {
          var label = "In Poverty %";
      }
      
      else if(chosenXAxis === "income"){
          var label = "Household Income (median)"
      }
      
      else {
          var label = "Age(median)"
      }
// variable that declares what the tooltip displays
    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([70, 70])
    .html(function(d) {
        return (`${d.state}<br> ${label} : ${d[chosenXAxis]}`);
    });

    circlesGroup.call(toolTip);
// mourseover action that calls tooltip
    circlesGroup.on("mouseover", function(data){
       toolTip.show(data);
    })
    
    .on("mouseout", function(data){
        toolTip.hide(data);
    });

    return circlesGroup;
}

//retrieve data from the csv and execute

d3.csv("assets/data/censusData.csv").then(function(censusData) {

// change data into number format
    censusData.forEach(function(data){
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });

//create x scale using function
    var xLinearScale = xScale(censusData, chosenXAxis);
// create fixed y scale until the extra is attempted
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, d => d.healthcare)])
    .range([height, 0]);

// create axis'

var bottomAxis = d3.axisBottom(xLinearScale);

var leftAxis = d3.axisLeft(yLinearScale);

// append x axis 

var xAxis = chartGroup.append("g")
.classed("x-axis", true)
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

// append y axis
chartGroup.append("g")
.call(leftAxis);

// append y axis label
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - (margin.left/2))
.attr("x", 0- (height/2) )
.attr("dy", "1em")
.classed("axis-text", true)
.text("Lacks Healthcare (%)");

var labelGroup = chartGroup.append("g")
.attr("transform", `translate(${width/2}, ${height+20})`);

// create and append x axis labels

var povertyLabel = labelGroup.append("text")
.attr("x", 0)
.attr("y", 20)
.attr("value", "poverty")
.classed("active", true)
.text("In Poverty %");

var ageLabel = labelGroup.append("text")
.attr("x", 0)
.attr("y", 40)
.attr("value", "age")
.classed("inactive", true)
.text("Age(median)");

var incomeLabel = labelGroup.append("text")
.attr("x", 0)
.attr("y", 60)
.attr("value", "income")
.classed("inactive", true)
.text("Household Income (median)");



// build circles
var circles = chartGroup.selectAll("g circle")
.data(censusData)
.enter();

var circlesGroup = circles
.append("circle")
.attr("cx", d => xLinearScale(d[chosenXAxis]))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", 18)
.classed("stateCircle", true)
.attr("opacity", ".5");

var stateText = circles
.append("text")
.text( d=> d.abbr)
.classed("stateText", true)
.attr("dx", d => xLinearScale(d[chosenXAxis]))
.attr("dy", d => yLinearScale(d.healthcare));


var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
// execute x variable change 
labelGroup.selectAll("text")
.on("click", function(){
    var value = d3.select(this).attr("value");
    if (value !== chosenXAxis){
        chosenXAxis = value;

        xLinearScale= xScale(censusData, chosenXAxis);
        
        xAxis = renderAxes(xLinearScale, xAxis)

        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        stateText = renderLabels(stateText,xLinearScale, chosenXAxis);




        if(chosenXAxis === "poverty") {
            povertyLabel
            .classed("active", true)
            .classed("inactive", false);

            ageLabel
            .classed("active", false)
            .classed("inactive", true);

            incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        
        else if(chosenXAxis === "income"){
            povertyLabel
            .classed("active", false)
            .classed("inactive", true)

            ageLabel
            .classed("active", false)
            .classed("inactive", true)

            incomeLabel
            .classed("active", true)
            .classed("inactive", false)
        }
        
        else {
            povertyLabel
            .classed("active", false)
            .classed("inactive", true);

            incomeLabel
            .classed("active", false)
            .classed("inactive", true);

            ageLabel
            .classed("active", true)
            .classed("inactive", false);
        }

    }
    });

});

