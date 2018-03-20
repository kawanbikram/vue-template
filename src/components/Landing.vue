<!-- //////// -->
<!-- Template -->
<!-- //////// -->

<template>

    <div id=landing>
        <div class="container">
            <div class="chartContainer">
            </div>
        </div>
    </div>


</template>

<!-- ///////////// -->
<!-- Vue Component -->
<!-- ///////////// -->

<script>

    const rawData = require('../data')
    import * as d3 from 'd3';
    console.log(rawData)
    export default {
        name: 'landing',
        mounted: function () {


            const width = 400; //document.querySelector('.container').clientWidth;
            const height = 300;//document.querySelector('.container').clientHeight-100;
            console.log(height)
            const sizeDivisor = 100, nodePadding = 2.5;
            const svg = d3.select(".container")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            const color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]);

            const simulation = d3.forceSimulation()
                .force("forceX", d3.forceX().strength(.1).x(width * .5))
                .force("forceY", d3.forceY().strength(.1).y(height * .5))
                .force("center", d3.forceCenter().x(width * .5).y(height * .5))
                .force("charge", d3.forceManyBody().strength(-205));

          //  d3.csv(data, (error, rawData) => {
             //   if (error) throw error;


                console.log(rawData, 'data')
                const data = rawData.map(d => ({
                    country: d.country,
                    gdp: parseFloat(d.gdp),
                    continent: d.continent
                })).filter(d => d.gdp >0 && d.gdp >100 )
                    .sort((a, b) => b.gdp - a.gdp)
                // sort the nodes so that the bigger ones are at the back


                const scaleRadius = d3.scaleLinear().domain(d3.extent(data,d=>d.gdp)).range([20,50])

                console.log(data)

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

                //update the simulation based on the data
                setInterval(() => {
                    simulation
                        .nodes(data)
                        .force("collide", d3.forceCollide()
                            .strength(.2)
                            .radius(d => scaleRadius(d.gdp) + nodePadding)
                            .iterations(1))
                        .on("tick", d => {
                            node
                                .attr("cx", d => d.x)
                                .attr("cy", d => d.y)
                        });
                }, 200)

                const node = svg.append("g")
                    .attr("class", "node")
                    .selectAll("circle")
                    .data(data)
                    .enter().append("circle")
                    .attr("r", d => scaleRadius(d.gdp))
                    .attr("fill", d => color(d.continent))
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended));

                setInterval(() => {
                    simulation.restart()
                    simulation.alphaTarget(.3);
                    console.log('Simulation running')
                }, 2000)

         //   });





        }
    }

</script>

<!-- ////// -->
<!-- Styles -->
<!-- ////// -->

<style lang="scss">
    #landing {
        height: 100%;
        width: 100%;
        background: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;

        .container {
            width: 40%;
            height: 500px;
            transform: rotate(-45deg);
            text-align: center;
            border: 1px solid;
        }

    }


</style>
