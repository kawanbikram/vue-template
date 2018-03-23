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
            const DELAY = 100;
            const TEXT_DELAY = 300;
            const radiusDimension = [5, 100]
            const simulation = d3.forceSimulation()
                .force("forceX", d3.forceX().strength(.1).x(width))
                .force("forceY", d3.forceY().strength(.1).y(height))
                .force("center", d3.forceCenter().x(width * .5).y(height * .5))
                .force("charge", d3.forceManyBody().strength(-150))
                .force("collide", d3.forceCollide().radius(d => d.radius + 0.5).iterations(2))

            let firstSimulate = true;
            const scaleRadius = d3.scaleLinear()
                .domain(d3.extent(this.props.rawData, d => d.gdp))
                .range(radiusDimension)
            const data = this.props.rawData.map((d, i) => ({
                label: d.label,
                gdp: parseFloat(d.gdp),
                radius: scaleRadius(parseFloat(d.gdp)),
                continent: d.continent,
                r: scaleRadius(parseFloat(d.gdp)),
                i
            }))


            // sort the nodes so that the bigger ones are at the back
            let nodeGroup;
            let simulateData = data.slice();
            const that = this;
            setInterval(() => {
                if (firstSimulate) {
                    firstSimulate = false;
                    simulation
                        .nodes(simulateData)
                        .on("tick", (...d) => {

                            // bounded box calculation from https://bl.ocks.org/mbostock/1129492
                            nodeGroup
                                .attr('transform', function (d) {
                                    return `translate(${Math.max(d.radius, Math.min(width - d.radius, d.x))}, ${Math.max(d.radius, Math.min(height - d.radius, d.y))})`;
                                })
                            nodeGroup.select('circle')
                                .transition()
                                .duration(DELAY)
                                .attr('r', d => d.radius)

                        });


                    nodeGroup = svg.selectAll("g")
                        .data(simulateData)
                        .enter()
                        .append('g')
                        .attr('data-attr', d => d.continent)


                    nodeGroup.append("circle")
                        .attr("fill", d => colorScale(d.radius))
                        .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended))
                        .attr('data-circle', d => d.continent)
                    // nodeGroup.append('text')
                    //     .text(d => d.country)
                    //     .attr('data-text', d => d.country)
                    //     .classed('notvisible', d => d.radius < 90)

                    nodeGroup.append("foreignObject")
                        .attr("width", 2 * radiusDimension[1])
                        .attr("height", 2 * radiusDimension[1])
                        .attr('x', -radiusDimension[1])
                        .attr('y', -radiusDimension[1])
                        .attr('class', 'foreignText')
                        .classed('notvisible', d => d.radius < 0.9 * radiusDimension[1])
                        .append("xhtml:body")
                        .style("font", "14px 'Helvetica Neue'")
                        .html(d => `<div class='inlineText'>${d.label}</div>`)


                } else {

                    simulateData.forEach(item => item.radius = updateRadius(item, data))

                    simulation
                        .nodes(simulateData)
                        .on("tick", (d, i) => {
                            // bounded box calculation from https://bl.ocks.org/mbostock/1129492

                            nodeGroup
                                .attr('transform', function (d) {

                                    return `translate(${Math.max(d.radius, Math.min(width - d.radius, d.x))}, ${Math.max(d.radius, Math.min(height - d.radius, d.y))})`;
                                })
                            const circle = nodeGroup.select('circle')
                                .transition()
                                .ease(d3.easePolyInOut)
                                .duration(DELAY)
                                .attr('r', d => d.radius)
                                .attr("fill", d => colorScale(d.radius))

                            // setTimeout(()=>{
                            //     nodeGroup.select('text')
                            //         .classed('notvisible', d => d.radius < 90)
                            // },DELAY)

                            setTimeout(() => {
                                nodeGroup.select('foreignObject')
                                    .classed('notvisible', d => d.radius < 0.9 * radiusDimension[1])
                            }, TEXT_DELAY)

                            // simulation.stop()

                        });

                }


                simulation.alpha(this.props.alpha);
                //  simulation.stop()
                console.log('Simulation running')
            }, 3000)

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
    .notvisible {
        display: none;

    }

    .foreignText {
        body {
            margin: 0;
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            font-size: 22px !important;
        }

    }

    .inlineText {

        padding: 10px;
    }


</style>
