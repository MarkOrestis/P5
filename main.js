window.onload = start;
function start() {

    var graph = document.getElementById('graph');
    var filter = document.getElementById('filter');


    var width = 1050;
    var height = 1550;
    var r = d3.scaleLinear().domain([0, 10]).range([0, 7]);
    var c = d3.scaleLinear(d3.schemeCategory20c).domain([0, 300000]);
    var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height / 2),
        margin = { top: 30, right: 0, bottom: 50, left: 30 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
    //Right Side SVG
    var svg2 = d3.select(graph)
        .append('svg')
        .attr('width', 400)
        .attr('height', height + 60);
    //Chart Legend
    svg2.append("rect")
        .attr("width", 150)
        .attr("height", 150)
        .attr("fill", "transparent")
        .attr("stroke", "gray")
        .attr("transform", "translate(20, 0)");
    svg2.append("text")
        .text("Facebook Likes")
        .attr("transform", "translate (40, 20)");
    svg2.append("circle")
        .attr("r", 10)
        .attr("fill", "#0000FF")
        .attr("transform", "translate(50, 50)");
    svg2.append("text")
        .text(">100000")
        .attr("transform", "translate(70, 55)");
    svg2.append("circle")
        .attr("r", 10)
        .attr("fill", "#0074D9")
        .attr("transform", "translate(50, 75)");
    svg2.append("text")
        .text(">10000")
        .attr("transform", "translate(70, 80)");
    svg2.append("circle")
        .attr("r", 10)
        .attr("fill", "#39CCCC")
        .attr("transform", "translate(50, 100)");
    svg2.append("text")
        .text(">1000")
        .attr("transform", "translate(70, 105)");
    svg2.append("circle")
        .attr("r", 10)
        .attr("fill", "#7FDBFF")
        .attr("transform", "translate(50, 125)");
    svg2.append("text")
        .text(">100")
        .attr("transform", "translate(70, 130)");


    //information after clicking
    svg2.append("rect")
        .attr("width", 300)
        .attr("height", 150)
        .attr("fill", "transparent")
        .attr("stroke", "gray")
        .attr("transform", "translate(20, 180)");

    svg2.append("text")
        .text("Movie:")
        .attr("transform", "translate(30, 200)")

    svg2.append("text")
        .attr('id', "movie")
        .text("")
        .attr("transform", "translate(100, 200)")

    svg2.append("text")
        .text("Director:")
        .attr("transform", "translate(30, 220)")

    svg2.append("text")
        .attr('id', "director")
        .text("")
        .attr("transform", "translate(100, 220)")


    svg2.append("text")
        .text("Actor 1:")
        .attr("transform", "translate(30, 240)")

    svg2.append("text")
        .attr('id', "actor1")
        .text("")
        .attr("transform", "translate(100, 240)")

    svg2.append("text")
        .text("Actor 2:")
        .attr("transform", "translate(30, 260)")

    svg2.append("text")
        .attr('id', "actor2")
        .text("")
        .attr("transform", "translate(100, 260)")

    svg2.append("text")
        .text("Actor 3:")
        .attr("transform", "translate(30, 280)")

    svg2.append("text")
        .attr('id', "actor3")
        .text("")
        .attr("transform", "translate(100, 280)")

    svg2.append("text")
        .text("Genre:")
        .attr("transform", "translate(30, 300)")

    svg2.append("text")
        .attr('id', "genre")
        .text("")
        .attr("transform", "translate(80, 300)")
    
    svg2.append("text")
        .text("Imdb Rating:")
        .attr("transform", "translate(30, 320)")

    svg2.append("text")
        .attr('id', "imdb")
        .text("")
        .attr("transform", "translate(120, 320)")



    //-----------------------------------------------------

    d3.select(filter)
        .append('span')
        .append('input')
        .attr('class', 'search-box')
        .attr('placeholder', 'search movie title')
        .attr('type', 'text')
        .attr('name', 'textInput')

    d3.select(filter)
        .append('span')
        .append('button')
        .text('Filter Data')
        .on('click', onFilter);

    d3.select(filter)
        .append('span')
        .append('button')
        .text('Reset Filter')
        .on('click', function () {
            console.log(svg.selectAll("input[name='mode']:checked"));
            svg.selectAll('circle')
                .transition()
                .duration(function (d) {
                    return Math.random() * 1000;
                })
                .style('opacity', 1);
        });

    d3.selectAll("input[name='mode']").on('change', function (d) {
        var valueRadioButton = this.value;
        console.log(valueRadioButton);
        svg.selectAll('circle')
            .transition()
            .duration(1000)
            .style('opacity', 1);

        svg.selectAll('circle')
            .filter(function (d) {
                if (valueRadioButton == 2009) {
                    return d.title_year == valueRadioButton;
                }
                return d.title_year != valueRadioButton
            })
            .transition()
            .duration(function (d) {
                return Math.random() * 1000;
            })
            .style('opacity', 0);
    });

    function onFilter() {
        searchValue = d3.select('#filter').select('span').select('input').property('value');
        svg.selectAll('circle')
            .transition()
            .duration(1000)
            .style('opacity', 1);

        svg.selectAll('circle')
            .filter(function (d) {
                if (!(d.movie_title.toLowerCase().includes(searchValue.toLowerCase()))) {
                    return d.movie_title;
                }
            })
            .transition()
            .duration(function (d) {
                return Math.random() * 1000;
            }).remove();
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
            .attr("id", function (d, i) { return i; })
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
                if (d.movie_facebook_likes <= 1000)
                    return "#7FDBFF";
                if (d.movie_facebook_likes <= 10000 && d.movie_facebook_likes >= 1000)
                    return "#39CCCC";
                if (d.movie_facebook_likes <= 100000 && d.movie_facebook_likes >= 10000)
                    return "#0074D9";
                if (d.movie_facebook_likes <= 1000000 && d.movie_facebook_likes >= 100000)
                    return "#0000FF";
                // return c(d.country);
            })
            .attr("transform", "translate(6, 20)")
            .append("title")
            .text(function (d) {
                return d.movie_title;
            })

        var clicked = 0;
        svg.selectAll("circle").transition().duration(1000)
            .attr("cx", function (d) {
                return x(+d.imdb_score + (margin.left / 100));
            })
            .attr("cy", function (d) {
                return y(+d.budget);
            })
            .attr("r", function (d) {
                return r(5);
            }).on("end", (d, i) => {
                if (i == 1604) {
                    svg.selectAll("circle").on("click", (d, i) => {
                        barchart(d);
                        detailedInfo(d);
                    })
                }

            })

    });


    //Bottom 2nd Visual SVG
    var bsvg = d3.select(barChart)
        .append('svg')
        .attr('width', width)
        .attr('height', height / 2)
        .attr("transform", "translate(-100,0)"),
        bwidth = +bsvg.attr("width"),
        bheight = +bsvg.attr("height");
    

    var xb = d3.scaleLinear().range([0, bwidth]);
    var yb = d3.scaleBand().range([bheight, 0]);
    
    var bg = bsvg.append("g")
        .attr("transform", "translate (" + 30 + "," + 30 + ")");
    xb.domain([0, 260000]);
    bg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(70," + (bheight - 60) + ")")
        .call(d3.axisBottom(xb).ticks(15));
    bg.append("g")
        .append("text")
        .text("Facebook Likes")
        .attr("transform", "translate(" + (bwidth/2 - 20) + "," + (bheight - 30) + ")");
        yb.domain(["Director", "Actor 1", "Actor 2", "Actor 3"])
        // yb.domain([d.actor_1_name, d.actor_2_name, d.actor_3_name, d.director_name]);
        bg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(70," + "-35" + ")")
            .call(d3.axisLeft(yb));

    function barchart(d) {
        console.log(d);
        console.log(d.actor1_facebook_likes);
        bsvg.selectAll("rect").remove();
        var actor3color;
        var actor2color;
        var actor1color;
        var directorcolor;
        if (d.actor_3_facebook_likes <= 1000)
                actor3color = "#39ccccc";
        if (d.actor_3_facebook_likes <= 10000 && d.actor_3_facebook_likes >= 1000)
                actor3color = "#7FDBFF";
        if (d.actor_3_facebook_likes <= 100000 && d.actor_3_facebook_likes >= 10000)
                actor3color = "#0074D9";
        if (d.actor_3_facebook_likes <= 1000000 && d.actor_3_facebook_likes >= 100000)
                actor3color = "#0000FF";
        if (d.actor_2_facebook_likes <= 1000)
                actor2color = "#39ccccc";
        if (d.actor_2_facebook_likes <= 10000 && d.actor_2_facebook_likes >= 1000)
                actor2color = "#7FDBFF";
        if (d.actor_2_facebook_likes <= 100000 && d.actor_2_facebook_likes >= 10000)
                actor2color = "#0074D9";
        if (d.actor_2_facebook_likes <= 1000000 && d.actor_2_facebook_likes >= 100000)
                actor2color = "#0000FF";
        if (d.actor_1_facebook_likes <= 1000)
                actor1color = "#39ccccc";
        if (d.actor_1_facebook_likes <= 10000 && d.actor_1_facebook_likes >= 1000)
                actor1color = "#7FDBFF";
        if (d.actor_1_facebook_likes <= 100000 && d.actor_1_facebook_likes >= 10000)
                actor1color = "#0074D9";
        if (d.actor_1_facebook_likes <= 1000000 && d.actor_1_facebook_likes >= 100000)
                actor1color = "#0000FF";
        if (d.director_facebook_likes <= 1000)
                directorcolor = "#39ccccc";
        if (d.director_facebook_likes <= 10000 && d.director_facebook_likes >= 1000)
                directorcolor = "#7FDBFF";
        if (d.director_facebook_likes <= 100000 && d.director_facebook_likes >= 10000)
                directorcolor = "#0074D9";
        if (d.director_facebook_likes <= 1000000 && d.director_facebook_likes >= 100000)
                directorcolor = "#0000FF";
        bsvg.append("rect")
            .attr("width", xb(d.actor_3_facebook_likes))
            .attr("height", 50)
            .attr("fill", actor3color)
            .attr("stroke", false)
            .attr("transform", "translate(100, 20)");
        bsvg.append("rect")
            .attr("width", xb(d.actor_2_facebook_likes))
            .attr("height", 50)
            .attr("fill", actor2color)
            .attr("stroke", false)
            .attr("transform", "translate(100, 100)");
        bsvg.append("rect")
            .attr("width", xb(d.actor_1_facebook_likes))
            .attr("height", 50)
            .attr("fill", actor1color)
            .attr("stroke", false)
            .attr("transform", "translate(100, 180)");
        bsvg.append("rect")
            .attr("width", xb(d.director_facebook_likes))
            .attr("height", 50)
            .attr("fill", directorcolor)
            .attr("stroke", false)
            .attr("transform", "translate(100, 260)");
    }
    function clear() {
        d3.selectAll("bsvg > *").remove();
    }
//     g = svg.append("g").attr("transform", "translate(" + (margin.left - 6) + "," + (margin.top + 20) + ")");
    function detailedInfo(d) {
        d3.select("#movie").text(d.movie_title);
        d3.select("#director").text(d.director_name);
        d3.select("#actor1").text(d.actor_1_name);
        d3.select("#actor2").text(d.actor_2_name);
        d3.select("#actor3").text(d.actor_3_name);
        d3.select("#genre").text(d.genres);
        d3.select("#imdb").text(d.imdb_score);
    }
    g = svg.append("g").attr("transform", "translate(40, 20)");
    var formatNumber = d3.format(".1f");

    var x = d3.scaleLinear()
        .domain([1, 10])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([0, 280000000])
        .range([height, 0]);

    var xAxis = d3.axisBottom(x)
        .ticks(10);


    var yAxis = d3.axisRight(y)
        .ticks(10)
        .tickSize(width);

    svg.append('text')
        .attr('class', 'labelAxis')
        .attr('transform', 'translate(500, 750)')
        .style('font-weight', 'bold')
        .text('Imdb Rating');

    svg.append('text')
        .attr('class', 'labelAxis')
        .attr('transform', 'translate(10, 400)rotate(-90)')
        .style('font-weight', 'bold')
        .text('Budget');

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height) + ")")
        .call(customXAxis);

    g.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(-20," + "0" + ")")
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
        .extent([[0, 0], [width, height + 50]]),
        idleTimeout,
        idleDelay = 350;
    var e = brush.extent();
    var brushX = d3.scaleLinear().range([0, width]);
    var brushY = d3.scaleLinear().range([0, height]);

    brush
        .on("start", brushstart)   // when mousedown&dragging starts
        .on("brush", brushing)          // when dragging
        .on("end", brushend);      // when mouseup

    function brushstart() {

    }


    function brushing() {
        svg.selectAll('circle').classed("selected", function (d, i) {

        });
    }
    function idled() {
        idleTimeout = null;
    }
    var x0 = [0, 10];
    var y0 = [0, 280000000];
    function brushend() {
        var s = d3.event.selection;
        if (!s) {
            console.log(s);
            // console.log(s);
            if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
            x.domain(x0);
            y.domain(y0);
        } else {
            console.log(s);
            x.domain([s[0][0], s[1][0]].map(x.invert, x));
            y.domain([s[1][1], s[0][1]].map(y.invert, y));
            svg.select(".brush").call(brush.move, null);
        }
        svg.selectAll("circle").classed("selected", function (d, i) {

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


    //Legend


}
