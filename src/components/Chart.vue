<!-- //////// -->
<!-- Template -->
<!-- //////// -->

<template>

    <div :class="props.className" style="margin: 10px">
    </div>

</template>

<!-- ///////////// -->
<!-- Vue Component -->
<!-- ///////////// -->

<script>
    import * as d3 from 'd3';
    export default {
        name: 'chart',
        props: ['props'],
        mounted: function () {
            const width = this.props.width;
            const height = this.props.height;
            const svg = d3.select(`.${this.props.className}`)
                .append("svg")
                .attr("width", width)
                .attr("height", height);
            const colorScale = d3.scaleLinear()
                .domain(d3.extent(this.props.rawData, d => d.gdp))
                .range(this.props.color)
            const DELAY = 150;
            const radiusDimension = [5, 100]
            const simulation = d3.forceSimulation()
                .force("forceX", d3.forceX().strength(.1).x(width))
                .force("forceY", d3.forceY().strength(.1).y(height))
                .force("center", d3.forceCenter().x(width * .5).y(height * .5))
                .force("charge", d3.forceManyBody().strength(-150))
                .force("collide", d3.forceCollide().radius(function (d) {
                    return d.radius + 0.5;
                }).iterations(2))

            let firstSimulate = true;
            const scaleRadius = d3.scaleLinear()
                .domain(d3.extent(this.props.rawData, d => d.gdp))
                .range(radiusDimension)
            const data = this.props.rawData.map((d, i) => ({
                country: d.country,
                gdp: parseFloat(d.gdp),
                radius: scaleRadius(parseFloat(d.gdp)),
                continent: d.continent,
                r: scaleRadius(parseFloat(d.gdp)),
                i
            }))


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
                                        simulation.alphaTarget(this.props.alpha);
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

                        simulateData.forEach(item => item.radius = updateRadius(item, data))

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
                                    .attr("fill", d => colorScale(d.radius))
                            });

                    }

                    simulation.alpha(this.props.alpha).restart();
                    console.log('Simulation running')
                },
                5000
            )

            //});

            const dragstarted = d => {
                if (!d3.event.active) simulation.alphaTarget(this.props.alpha).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            const dragged = d => {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            const dragended = d => {
                if (!d3.event.active) simulation.alphaTarget(this.props.alpha);
                d.fx = null;
                d.fy = null;
            }


        },
        updated: function () {

            console.log("I am updated")
        }

    }

    const updateRadius = (item, data) => {
        item.i = item.i + 1 === data.length ? 0 : item.i + 1;
        return data[item.i].r;
    }


</script>

<!-- ////// -->
<!-- Styles -->
<!-- ////// -->

<style lang="scss">


</style>
