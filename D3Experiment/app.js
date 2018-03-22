const width = 400;//document.querySelector('.container').clientWidth;
const height = 400;//document.querySelector('.container').clientHeight;
const sizeDivisor = 100, nodePadding = 2.5;
const svg = d3.select(".container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]);
const DELAY = 100;
const radiusDimension = [10, 30]
const RADIUS_OFFSET = 5;
const simulation = d3.forceSimulation()
    .force("forceX", d3.forceX().strength(.1).x(width))
    .force("forceY", d3.forceY().strength(.1).y(height))
    .force("center", d3.forceCenter().x(width * .5).y(height * .5))
    .force("charge", d3.forceManyBody().strength(-100))

let firstSimulate = true;
d3.csv("data.csv", (error, rawData) => {
    if (error) throw error;
    console.log(rawData, 'data')
    const scaleRadius = d3.scaleLinear().domain(d3.extent(rawData, d => d.gdp)).range(radiusDimension)

    const data = rawData.map(d => ({
        country: d.country,
        gdp: parseFloat(d.gdp),
        radius: scaleRadius(parseFloat(d.gdp)),
        continent: d.continent
    }))
        .filter(d => d.radius > 0 && d.radius < 20)
        .slice(1, 20)
        .sort((a, b) => b.radius - a.radius)
    // sort the nodes so that the bigger ones are at the back
    let node;
    let simulateData = data.slice();
    setInterval(() => {
        if (firstSimulate) {
            firstSimulate = false;
            simulation
                .nodes(simulateData)
                .force("collide", d3.forceCollide()
                    .strength(.2)
                    .radius(d => d.radius + nodePadding)
                    .iterations(1))
                .on("tick", d => {

                    // bounded box calculation from https://bl.ocks.org/mbostock/1129492
                    node
                        .attr("cx", (d) => Math.max(d.radius, Math.min(width - d.radius, d.x)))
                        .attr("cy", d => Math.max(d.radius, Math.min(height - d.radius, d.y)))
                        .transition()
                        .duration(DELAY)
                        .attr('r', d => d.radius)
                });
            node = svg.append("g")
                .attr("class", "node")
                .selectAll("circle")
                .data(simulateData, d => d)
                .enter()
                .append("circle")
                .attr("fill", d => color(d.continent))
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

        } else {

            simulateData.forEach((item, i) => {
                const temp = data[i].radius - (RADIUS_OFFSET * (Math.random() < 0.5 ? -1 : 1));
                item.radius = (temp < 0 || temp > scaleRadius.range()[1]) ? data[i].radius : temp;

            })

            simulation
                .radius(d => d.radius + nodePadding)
                .on("tick", (d, i) => {
                    // bounded box calculation from https://bl.ocks.org/mbostock/1129492
                    node
                        .attr("cx", (d) => Math.max(d.radius, Math.min(width - d.radius, d.x)))
                        .attr("cy", d => Math.max(d.radius, Math.min(height - d.radius, d.y)))
                        .transition()
                        .ease(d3.easePolyInOut)
                        .duration(DELAY)
                        .attr('r', d => d.radius)
                });

        }

        simulation.restart()
        simulation.alphaTarget(.3);
        console.log('Simulation running')
    }, 3000)

});

const dragstarted = d => {
    if (!d3.event.active) simulation.alphaTarget(.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

const dragged = d => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

const dragended = d => {
    if (!d3.event.active) simulation.alphaTarget(.3);
    d.fx = null;
    d.fy = null;
}
