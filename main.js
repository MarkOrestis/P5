window.onload = start;

function start() {

    var graph = document.getElementById('graph');

    var width = 1000;
    var height = 1500;
    var r = d3.scaleLinear().domain([0, 10]).range([0, 7]);
    var c = d3.scaleOrdinal(d3.schemeCategory10).domain(["Australia", "Bahamas", "Belgium", "Brazil", "Bulgaria", "Cambodia", "Canada", "Chile", "China", 
    "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Georgia", "Germany", "Greece", "Hong Kong",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Ireland", 
    "Israel", "Italy", "Japan", "Kenya", "Kyrgyzstan", "Mexico", "New Zealand",
    "Nigeeria", "Norway", "Official Site", "Pakistan", "Panama", "Poland", 
    "Romania", "Russia", "Slovenia", "South Africa", "Spain", "Sweden", "Switzerland", 
    "Taiwan", "Thailand", "UK", "USA"]);
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



    // var circles = svg.append('g');

    d3.csv('movies.csv', d => {
        //to make budget a number
        d.budget = +d.budget;
        return d;
        
    }, (error, data) => {
        svg.selectAll("circle").data(data).enter().append("circle")
        .attr("cx", function(d) {
          return x(0);
        })
        .attr("cy", function(d) {
          return y(0);
        })
        .attr("r", function(d) {
          return r(0);
        })
        .style("fill", function(d) {
            return c(d.country);
          })
        .append("title")
          .text(function (d) {
            return d.movie_title;
          })
        svg.selectAll("circle").transition().duration(1000)
          .attr("cx", function(d) {
            return x(+d.imdb_score);
          })
          .attr("cy", function(d) {
            return y(+d.budget);
          })
          .attr("r", function(d) {
            return r(5);
          })
        var imdbScore = d3.nest().key(d => {
                return d.imdb_score;
            }).sortKeys(d3.ascending)
            .rollup(v => {
                return v.map(s => {
                    return {
                        title: s.movie_title,
                        budget: s.budget,
                        country: s.country
                    }
                });
            })
            .entries(data);

        console.log(imdbScore);
    });
    
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var formatNumber = d3.format(".1f");

    var x = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width/1.19]);

    var y = d3.scaleLinear()
        .domain([0, 300000000])
        .range([height, 0]);

    var xAxis = d3.axisBottom(x)
        .ticks(10);
        

    var yAxis = d3.axisRight(y)
        .ticks(40)
        .tickSize(height);
        // .tickFormat(function(d) {
        //   var s = formatNumber(d / 1e6);
        //   return this.parentNode.nextSibling
        //       ? "\xa0" + s
        //       : "$" + s + " million";
        // });

    g.append("g")
        .attr("transform", "translate(50," + height + ")")
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
    
    
    