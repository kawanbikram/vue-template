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
                .domain(d3.extent(this.props.rawData, d => d.score))
                .range(this.props.color)

            const simulation = d3.forceSimulation()
                .force("forceX", d3.forceX().strength(.1).x(width))
                .force("forceY", d3.forceY().strength(.1).y(height))
                .force("center", d3.forceCenter().x(width * .5).y(height * .5))
                .force("charge", d3.forceManyBody().strength(this.props.forceSeparation))
                .force("collide", d3.forceCollide().radius(d => d.radius + 0.5).iterations(2))

            let firstSimulate = true;
            const scaleRadius = d3.scaleLinear()
                .domain(d3.extent(this.props.rawData, d => d.score))
                .range(this.props.radiusDimension)

            const data = this.props.rawData.map((d, i) => ({
                ...d,
                score: parseFloat(d.score),
                radius: scaleRadius(parseFloat(d.score)),
                r: scaleRadius(parseFloat(d.score)),
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
                                .attr('transform', d => `translate(${Math.max(d.radius, Math.min(width - d.radius, d.x))}, ${Math.max(d.radius, Math.min(height - d.radius, d.y))})`)
                                .classed('cursor', function () {
                                        return d3.select(this).select('circle').attr('r') > that.props.clickAbleRadius;
                                    }
                                )

                            nodeGroup.select('circle')
                                .transition()
                                .duration(this.props.delay)
                                .attr('r', d => d.radius)
                        });


                    nodeGroup = svg.selectAll("g")
                        .data(simulateData)
                        .enter()
                        .append('g')
                        .attr('data-attr', d => d.score)
                        .on('click', function (d) {
                            const currentRadius = d3.select(this).select('circle').attr('r')
                            if (currentRadius > that.props.clickAbleRadius) window.open(d.url, '_blank');
                        })


                    nodeGroup.append("circle")
                        .attr("fill", d => colorScale(d.radius))
                        .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended))
                        .attr('data-circle', d => d.score)


                    nodeGroup.append("foreignObject")
                        .attr("width", 2 * this.props.radiusDimension[1])
                        .attr("height", 2 * this.props.radiusDimension[1])
                        .attr('x', -this.props.radiusDimension[1])
                        .attr('y', -this.props.radiusDimension[1])
                        .attr('class', 'foreignText')
                        .classed('notvisible', d => d.radius < this.props.visibleText)
                        .append("xhtml:body")
                        .html(d => `<div class='inlineText'>${d.label}</div>`)


                } else {

                    simulateData.forEach(item => item.radius = updateRadius(item, data))

                    simulation
                        .nodes(simulateData)
                        .on("tick", (d, i) => {
                            // bounded box calculation from https://bl.ocks.org/mbostock/1129492

                            nodeGroup
                                .attr('transform', d => `translate(${Math.max(d.radius, Math.min(width - d.radius, d.x))}, ${Math.max(d.radius, Math.min(height - d.radius, d.y))})`)
                                .classed('cursor', function () {
                                        return d3.select(this).select('circle').attr('r') > that.props.clickAbleRadius;
                                    }
                                )

                            nodeGroup.select('circle')
                                .transition()
                                .ease(d3.easePolyInOut)
                                .duration(this.props.delay)
                                .attr('r', d => d.radius)
                                .attr("fill", d => colorScale(d.radius))

                            setTimeout(() => {
                                nodeGroup.select('foreignObject')
                                    .classed('notvisible', d => d.radius < this.props.visibleText)
                            }, this.props.textDelay)

                            //simulation.stop()

                        });

                }


                simulation.alpha(this.props.alpha);
                //  simulation.stop()
                console.log('Simulation running')
            }, this.props.simulationInterval)


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

    .cursor {
        cursor: pointer;
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
