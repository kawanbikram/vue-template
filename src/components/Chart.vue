<!-- //////// -->
<!-- Template -->
<!-- //////// -->

<template>

    <div :class="className" style="margin: 10px">
    </div>

</template>

<!-- ///////////// -->
<!-- Vue Component -->
<!-- ///////////// -->

<script>
    const rawData = require('../data')
    import * as d3 from 'd3';
    import _ from 'lodash'

    const random = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
    export default {
        name: 'chart',
        props: ['className'],
        mounted: function () {
            const width = 500;//document.querySelector('.container').clientWidth;
            const height = 500;//document.querySelector('.container').clientHeight;

            const svg = d3.select(`.${this.className}`)
                .append("svg")
                .attr("width", width)
                .attr("height", height);
            const color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]);
            const colorScale = d3.scaleLinear().domain(d3.extent(rawData, d => d.gdp)).range(['lightgrey', 'grey'])
            const DELAY = 100;
            const radiusDimension = [5, 100]
            const RADIUS_OFFSET = 5;
            const simulation = d3.forceSimulation()
                .force("forceX", d3.forceX().strength(.1).x(width))
                .force("forceY", d3.forceY().strength(.1).y(height))
                .force("center", d3.forceCenter().x(width * .5).y(height * .5))
                .force("charge", d3.forceManyBody().strength(-150))
                .force("collide", d3.forceCollide().radius(function (d) {
                    return d.radius + 0.5;
                }).iterations(2))

            let firstSimulate = true;
            console.log(rawData, 'data')
            const scaleRadius = d3.scaleLinear()
                .domain(d3.extent(rawData, d => d.gdp))
                .range(radiusDimension)

            let data = rawData.map(d => ({
                country: d.country,
                gdp: parseFloat(d.gdp),
                radius: scaleRadius(parseFloat(d.gdp)),
                continent: d.continent
            }))
            // .filter(d => d.radius > 0 && d.radius < 20)
                .slice(1, 20)
                .sort((a, b) => b.radius - a.radius)

            const scaleR = d3.scaleLinear()
                .domain(d3.extent(data, d => d.gdp))
                .range(radiusDimension)

            data = data.map((d, i) => ({...d, i, r: scaleR(d.gdp), radius: scaleR((d.gdp))}))

            // sort the nodes so that the bigger ones are at the back
            let node;
            let simulateData = data.slice();
            setInterval(() => {
                if (firstSimulate) {
                    firstSimulate = false;
                    simulation
                        .nodes(simulateData)
                        .on("tick", d => {
                            // bounded box calculation from https://bl.ocks.org/mbostock/1129492
                            node
                            //.attr("cx", (d) => d.x)
                                .attr("cx", (d) => Math.max(d.radius, Math.min(width - d.radius, d.x)))
                                //.attr("cy", d => d.y)
                                .attr("cy", d => Math.max(d.radius, Math.min(height - d.radius, d.y)))
                                .transition()
                                .duration(DELAY)
                                .attr('r', (d) => {
                                    simulation.restart()
                                    simulation.alphaTarget(.3);
                                    return d.radius
                                })
                        });


                    node = svg.append("g")
                        .attr("class", "node")
                        .selectAll("circle")
                        .data(simulateData)
                        .enter()
                        .append("circle")
                        .attr("fill", d => colorScale(d.radius))
                        .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended));


                }

                else {

                    simulateData.forEach((item, index) => {
                        item.i = item.i + 1 === simulateData.length ? 0 : item.i + 1;
                        item.radius = data[item.i].r;

                    })

                    simulation
                        .nodes(simulateData)
                        .on("tick", (d, i) => {
                            // bounded box calculation from https://bl.ocks.org/mbostock/1129492
                            node
                            // .attr("cx", (d) => d.x)
                                .attr("cx", (d) => Math.max(d.radius, Math.min(width - d.radius, d.x)))
                                // .attr("cy", d => d.y)
                                .attr("cy", d => Math.max(d.radius, Math.min(height - d.radius, d.y)))
                                .transition()
                                .ease(d3.easePolyInOut)
                                .duration(DELAY)
                                .attr('r', (d) => {

                                    // simulation.stop()
                                    //  simulation.alpha(1).restart();

                                    return d.radius
                                })
                        });

                }

                simulation.alpha(0.3).restart();
                console.log('Simulation running')
            }, 3000)

            //});

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


        },
        updated: function () {

            console.log("I am updated")
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


</script>

<!-- ////// -->
<!-- Styles -->
<!-- ////// -->

<style lang="scss">


</style>
