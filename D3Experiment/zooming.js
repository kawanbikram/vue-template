// D3 CIRCLE PACK FORCE COLLIDE

var subscription = null;
var width = 600;
var height = 300;
var maxSpeed = 1000000;
var pack = d3.pack().size([width, height]).padding(0);
const svg = d3.select(".container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
var	node = svg.selectAll("g.node");
var root;
var nodes = [];
var first = true;
var scaleFactor = 1;

var color = d3.interpolateHcl("#0faac3", "#dd2323");

var forceCollide = d3.forceCollide()
    .strength(.2)
    .radius(function(d)
    {
        return d.r;
    }).iterations(10);

var simulationStart = d3.forceSimulation()
    .force("forceX", d3.forceX(width/2).strength(.04))
    .force("forceY", d3.forceY(height/2).strength(.2))
    .force('collide', forceCollide)
    //.force("charge", d3.forceManyBody().strength(-20))
    .on('tick', ticked)

var simulation = d3.forceSimulation()
    .force("forceX", d3.forceX(width/2).strength(.0005))
    .force("forceY", d3.forceY(height/2).strength(.0025))
    .force('collide', forceCollide)
    //.force("charge", d3.forceManyBody().strength(-20))
    .on('tick', ticked);

function ticked()
{
    if (node)
    {
        node.attr('transform', function(d)
        {
            return "translate(" + d.x + "," + d.y + ")";
        }).select('circle').attr('r', function(d)
        {
            console.log(d.r,'radous')
            return d.r;
        });
    }
}

function rand(min, max)
{
    return Math.random() * (max - min) + min;
};


setInterval(function()
{
    var hosts = [];
    for (var i = 0; i < 10; i++)
    {
        hosts.push({name: i, cpu: rand(10,100), speed: rand(0,maxSpeed)});
    }

    root = d3.hierarchy({children: hosts})
        .sum(function(d)
        {
            return d.cpu ? d.cpu : 0;
        });

    var leaves = pack(root).leaves().map(function(item)
    {
        return {
            id: 'node-'+item.data.name,
            name: item.data.name,
            r: item.r * scaleFactor,
            x: width/2,
            y: height/2,
            cpu: item.data.cpu,
            speed: item.data.speed
        };
    });

    for (var i = 0; i < leaves.length; i++)
    {
        if (nodes[i] && nodes[i].id == leaves[i].id)
        {
            var oldR = nodes[i].newR;
            nodes[i].oldR = oldR;
            nodes[i].newR = leaves[i].r;
            nodes[i].cpu = leaves[i].cpu;
            nodes[i].speed = leaves[i].speed;
        }
        else
        {
            nodes[i] = leaves[i];
            //nodes[i].r = 1;
            nodes[i].oldR = 1;//nodes[i].r;
            nodes[i].newR = leaves[i].r;
        }
    }

    if (first)
    {
        first = false;

        node = node.data(nodes, function(d) { return d.id; });

        node = node.enter()
            .append('g')
            .attr('class', 'node');

        node.append("circle")
            .style("fill", 'transparent');

        node.append("text")
            .attr("dy", "0.3em")
            .style('fill', 'transparent')
            .style("text-anchor", "middle")
            .text(function(d)
            {
                return d.name;//.substring(0, d.r / 4);
            });

        // transition in size
        node.transition()
            .ease(d3.easePolyInOut)
            .duration(950)
            .tween('radius', function(d)
            {
                var that = d3.select(this);
                var i = d3.interpolate(1, d.newR);
                return function(t)
                {
                    d.r = i(t);
                    that.attr('r', function(d)
                    {
                        return d.r;
                    });
                    simulationStart.nodes(nodes).alpha(0.1);
                    console.log(nodes)
                }
            });

        // fade in text color
        node.select('text')
            .transition()
            .ease(d3.easePolyInOut)
            .duration(950)
            .style('fill', 'white');

        // fade in circle size
        node.select('circle')
            .transition()
            .ease(d3.easePolyInOut)
            .duration(950)
            .style('fill', function(d)
            {
                return color(d.speed / maxSpeed);
            });
    }
    else
    {
        console.log('else')
        // transition to new size
        node.transition()
            .ease(d3.easeLinear)
            .duration(950)
            .tween('radius', function(d)
            {
                var that = d3.select(this);
                var i = d3.interpolate(d.oldR, d.newR);

                return function(t)
                {

                    d.r = i(t);
                    console.log(i(t),t,'dtrans',d,)
                    that.attr('r', function(d)
                    {
                        return d.r;
                    });
                   // simulation.nodes(nodes).alpha(1);
                }
            });

        // transition to new color
        node.select('circle')
            .transition()
            .ease(d3.easeLinear)
            .duration(950)
            .style('fill', function(d)
            {
                return color(d.speed / maxSpeed);
            });
    }

}, 1000);