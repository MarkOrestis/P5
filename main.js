window.onload = start;

function start() {

    var graph = document.getElementById('graph');
    var filter = document.getElementById('filter');

    var width = 1000;
    var height = 1500;
    var r = d3.scaleLinear().domain([0, 10]).range([0, 7]);
    var c = d3.scaleLinear(d3.schemeCategory20c).domain([0, 300000]);//.range([0, 20]);//.range([0,4]);
    // (["Australia", "Bahamas", "Belgium", "Brazil", "Bulgaria", "Cambodia", "Canada", "Chile", "China",
    //     "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Georgia", "Germany", "Greece", "Hong Kong",
    //     "Hungary", "Iceland", "India", "Indonesia", "Iran", "Ireland",
    //     "Israel", "Italy", "Japan", "Kenya", "Kyrgyzstan", "Mexico", "New Zealand",
    //     "Nigeeria", "Norway", "Official Site", "Pakistan", "Panama", "Poland",
    //     "Romania", "Russia", "Slovenia", "South Africa", "Spain", "Sweden", "Switzerland",
    //     "Taiwan", "Thailand", "UK", "USA"]);
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
    var select = d3.select(graph)
        .append('p')
    var select = d3.select(filter)
        .append('span')
        .append('select')
        .attr('class', 'select');

    select.selectAll('option')
        .data(dropboxData).enter()
        .append('option')
        .text(function (d) { return d; })

    d3.select(filter)
        .append('span')
        .append('button')
        .text('Filter Data')
        .on('click', onFilter);

    d3.select(filter)
        .append('span')
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
        selectValue = d3.select(filter).select('span').select('select').property('value')
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
                // console.log(d.country);
                if (d.movie_facebook_likes < 1000)
                return "#10485F";
                if (d.movie_facebook_likes < 10000 && d.movie_facebook_likes > 1000)
                return "#003385";
                if (d.movie_facebook_likes < 100000 && d.movie_facebook_likes > 10000)
                return "#0022F6";
                if (d.movie_facebook_likes < 1000000 && d.movie_facebook_likes > 100000)
                return "#0000FF";
                // return c(d.country);
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
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(customXAxis);

    g.append("g")
        .attr("class", "axis axis--y")
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
    //Brushing -------------------------------
    var brush = d3.brush()
        .extent([[0, 0], [width, height]]);
    var e = brush.extent();
    var brushX = d3.scaleLinear().range([0, width]);
    var brushY = d3.scaleLinear().range([0, height]);

    brush
        .on("start", brushstart)   // when mousedown&dragging starts
        .on("brush", brushing)          // when dragging
        .on("end", brushend);      // when mouseu
    function brushstart() {

    }


    function brushing() {
        svg.selectAll('circle').classed("selected", function(d, i) {

        });
    }


    function brushend() {
        var s = d3.event.selection;
        if (!s) {

        } else {
            
            x.domain([s[0][0], s[1][0]].map(x.invert, x));
            y.domain([s[1][1], s[0][1]].map(y.invert, y));
            svg.select(".brush").call(brush.move, null);
        }
        svg.selectAll("circle").classed("selected", function(d, i)
        { 
            
            if (s) {
                
                // console.log(y.invert(s[0][1]));
                // return !(x.invert(s[0][0] - 500) <= d.imdb_score
                // && x.invert(s[1][0] + 500) >= d.imdb_score
                // && y.invert(s[0][1] + 420) <= d.budget);
                // && y.invert(s[1][1]) >= d.budget;
            }
        });
        zoom();
    }
    function zoom() {
        console.log("zooming");
        var t = svg.transition().duration(750);
        svg.select(".axis--x").transition(t).call(xAxis).call(customXAxis);
        svg.select(".axis--y").transition(t).call(yAxis).call(customYAxis);
        svg.selectAll("circle").transition(t)
        .attr("cx", function (d) {
            return x(+d.imdb_score + (margin.left / 100));
        })
        .attr("cy", function (d) {
            return y(+d.budget);
        });
    //         .attr("cx", function(d) { return x(d[0]); })
    //         .attr("cy", function(d) { return y(d[1]); });
      }

    svg.append("g")
        .attr("class", "brush")
        .attr("transform", "translate(" + (margin.left - 6) + ",0" + ")")
        .call(brush);

}
