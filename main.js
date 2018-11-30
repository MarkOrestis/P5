window.onload = start;
function start() {

    var graph = document.getElementById('graph');
    var filter = document.getElementById('filter');
 

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

    // var dropboxData = [2010, 2011, 2012, 2013, 2014, 2015, 2016];

    d3.select(filter)
        .append('span')
        .append('input')
        .attr('class','search-box')
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
        .on('click', function() {
            console.log(svg.selectAll("input[name='mode']:checked"));
            svg.selectAll('circle')
                .transition()
                .duration(function(d) {
                    return Math.random() * 1000;
                })
                .style('opacity', 1);
        });
    
    d3.selectAll("input[name='mode']").on('change', function(d) {
        var valueRadioButton = this.value;
        console.log(valueRadioButton);
        svg.selectAll('circle')
        .transition()
        .duration(1000)
        .style('opacity', 1);

        svg.selectAll('circle')
            .filter(function(d) {
                if (valueRadioButton == 2009) {
                    return d.title_year == valueRadioButton;
                }
                return d.title_year != valueRadioButton
            })
            .transition()
            .duration(function(d) {
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
            .filter(function(d) {
                if (!(d.movie_title.toLowerCase().includes(searchValue.toLowerCase()))) {
                    return d.movie_title;
                }
            })
            .transition()
            .duration(function(d) {
                return Math.random() * 1000;
            })
            .style('opacity', 0);
    };

    //Brushing -------------------------------
    var brushY = d3.scaleLinear().range([30, width]);
    var brushX = d3.scaleLinear().range([0, height]);
    var brush = d3.brush()
        .extent([[0, 0], [width, height]]);
    var e = brush.extent();


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
            console.log(s[0][0]);
        }
        svg.selectAll('circle').classed("selected", function(d, i) {

        });
    }

    svg.append("g")
        .attr("class", "brush")
        .call(brush);

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
                return c(d.country);
            })
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
            }).on("end", (d,i) => {
                if (i == 1604) {
                    svg.selectAll("circle").on("click", (d, i) => {
                        clicked++;
                        if (clicked == 1) {
                            svg.select("[id='" + i + "']").attr("class", "select1");
                        }
                        else if (clicked == 2) {
                            svg.select("[id='" + i + "']").attr("class", "select2");
                        }
                        else {
                            clicked = 0;
                            //reset color of circles
                        }
                    })
                }
                
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
