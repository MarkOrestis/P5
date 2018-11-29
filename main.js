window.onload = start;

function start() {

    var graph = document.getElementById('graph');

    var width = 700;
    var height = 800;

    var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height/2),
        margin = {top: 20, right: 0, bottom: 20, left: 0},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
    var y = d3.scaleTime()
        .domain([new Date(2010), new Date(2016)])
        .range([0, width]);
    var x = d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0]);

    d3.csv('movies.csv', function(d) {
        
    });
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var formatNumber = d3.format(".1f");

var x = d3.scaleLinear()
    .domain([0, 10])
    .range([0, width/1.19]);

var y = d3.scaleTime()
    .domain([new Date(2010, 1, 1), new Date(2016, 1, 1)])
    .range([height, 0]);

var xAxis = d3.axisBottom(x)
    .ticks(10);
    

var yAxis = d3.axisRight(y)
    .tickSize(width);
    // .tickFormat(function(d) {
    //   var s = formatNumber(d / 1e6);
    //   return this.parentNode.nextSibling
    //       ? "\xa0" + s
    //       : "$" + s + " million";
    // });

g.append("g")
    .attr("transform", "translate(30," + height/1.19 + ")")
    .call(customXAxis);

g.append("g")
    .call(customYAxis);

function customXAxis(g) {
  g.call(xAxis);
  g.select(".domain").remove();
}

function customYAxis(g) {
  g.call(yAxis);
  g.select(".domain").remove();
  g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
  g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
}
}    
    
    
    