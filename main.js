window.onload = start;

function start() {

    var graph = document.getElementById('graph');

    var width = 1000;
    var height = 800;

    var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    

    d3.csv('colleges.csv', function(d){
        console.log(d);
    });
}    
    
    
    