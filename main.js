window.onload = start;

function start() {

    var graph = document.getElementById('graph');

    var width = 1000;
    var height = 1500;
    var r = d3.scaleLinear().domain([0, 10]).range([0, 7]);
    var c = d3.scaleOrdinal(d3.schemeCategory20).domain(["Australia", "Bahamas", "Belgium", "Brazil", "Bulgaria", "Cambodia", "Canada", "Chile", "China",
        "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Georgia", "Germany", "Greece", "Hong Kong",
        "Hungary", "Iceland", "India", "Indonesia", "Iran", "Ireland",
        "Israel", "Italy", "Japan", "Kenya", "Kyrgyzstan", "Mexico", "New Zealand",
        "Nigeeria", "Norway", "Official Site", "Pakistan", "Panama", "Poland",
        "Romania", "Russia", "Slovenia", "South Africa", "Spain", "Sweden", "Switzerland",
        "Taiwan", "Thailand", "UK", "USA"]);
    var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height / 2),
        margin = { top: 30, right: 0, bottom: 50, left: 30 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
    var y = d3.scaleTime()
        .domain([new Date(2010), new Date(2016)])
        .range([0, width]);
    var x = d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0]);

    var dropboxData = [2010, 2011, 2012, 2013, 2014, 2015, 2016];
    var hallo = ["yo"];
    var select = d3.select(graph)
        .append('p')
        .append('select')
        .attr('class', 'select');

    select.selectAll('option')
        .data(dropboxData).enter()
        .append('option')
        .text(function (d) { return d; })

    d3.select(graph)
        .append('p')
        .append('button')
        .text('Filter Data')
        .on('click', onFilter);

    d3.select(graph)
        .append('p')
        .append('button')
        .text('Reset Filter')
        .on('click', function() {
            svg.selectAll('circle')
                .transition()
                .duration(function(d) {
                    return Math.random() * 1000;
                })
                .style('opacity', 1);
        });

    function onFilter() {
        selectValue = d3.select(graph).select('p').select('select').property('value')
        svg.selectAll('circle')
            .transition()
            .duration(1000)
            .style('opacity', 1);

        svg.selectAll('circle')
            .filter(function(d) {
                return d.title_year != selectValue;
            })
            .transition()
            .duration(function(d) {
                return Math.random() * 1000;
            })
            .style('opacity', 0);
    };

    d3.csv('movies.csv', d => {
        //to make budget a number
        d.budget = +d.budget;
        return d;
    }, (error, data) => {
        var nest = d3.nest()
            .key(function (d) {
                return d.movie_title;
            })
            .entries(data)
        
        svg.append("select")
            .selectAll("option")
            .data(nest)
            .enter()
            .append("option")
            .attr("value", function (d) {
                return d.key;
            })
            .text(function (d) {
                return d.key;
            })
        
        svg.selectAll("circle").data(data).enter().append("circle")
            .attr("cx", function (d) {
                return x(0);
            })
            .attr("cy", function (d) {
                return y(0);
            })
            .attr("r", function (d) {
                return r(0);
            })
            .style("fill", function (d) {
                return c(d.country);
            })
            .append("title")
            .text(function (d) {
                return d.movie_title;
            })
        svg.selectAll("circle").transition().duration(1000)
            .attr("cx", function (d) {
                return x(+d.imdb_score + (margin.left / 100));
            })
            .attr("cy", function (d) {
                return y(+d.budget);
            })
            .attr("r", function (d) {
                return r(5);
            })
    });



    g = svg.append("g").attr("transform", "translate(" + (margin.left - 6) + "," + (margin.top + 20) + ")");
    var formatNumber = d3.format(".1f");

    var x = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width / 1.19]);

    var y = d3.scaleLinear()
        .domain([0, 280000000])
        .range([height, 0]);

    var xAxis = d3.axisBottom(x)
        .ticks(10);


    var yAxis = d3.axisRight(y)
        .ticks(10)
        .tickSize(width);

    g.append("g")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(customXAxis);

    g.append("g")
        .attr("transform", "translate(0," + -margin.bottom + ")")
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


