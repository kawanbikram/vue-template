<!-- //////// -->
<!-- Template -->
<!-- //////// -->

<template>

    <div id=landing>
        <div class="container">
            <div class="chartContainer top">

                <Chart v-for="chart in charts" v-if="chart.positionTop" :className="chart.className"/>
            </div>

            <div class="middleContainer">
                <Category name="Sports"/>
                <DashLine/>
                <Category name="Housing"/>
                <DashLine/>
                <Category name="Health"/>
                <DashLine/>
                <Category name="Employment"/>
            </div>
            <div class="chartContainer bottom">

                <Chart v-for="chart in charts" v-if="!chart.positionTop" :className="chart.className"/>
            </div>

        </div>


    </div>


</template>

<!-- ///////////// -->
<!-- Vue Component -->
<!-- ///////////// -->

<script>

    import Chart from './Chart.vue';
    import Category from './Category.vue'
    import DashLine from './DashLine.vue'

    export default {
        name: 'landing',
        components: {
            Chart,
            Category,
            DashLine
        },
        data: function () {

            return {
                charts: [
                    {className: 'chart1', positionTop: true},
                    {className: 'chart2', positionTop: true},
                    {className: 'chart3', positionTop: true},
                    {className: 'chart4', positionTop: true},
                    {className: 'chart5', positionTop: false},
                    {className: 'chart6', positionTop: false},
                    {className: 'chart7', positionTop: false},
                    {className: 'chart8', positionTop: false},
                ]
            }

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
            width: 90%;
            height: 70%;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-21deg);
            text-align: center;
            border: 1px solid;
            display: flex;
            flex-direction: column;

            .chartContainer {
                display: flex;
                justify-content: space-around;
                align-items: center;
            }

            .middleContainer {
                border: 1px solid;
                height: 100px;
                display: flex;
                justify-content: space-around;
                align-items: center;

                div {
                    flex: 1;
                }

            }

        }

    }


</style>
