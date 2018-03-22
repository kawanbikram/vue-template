<!-- //////// -->
<!-- Template -->
<!-- //////// -->

<template>

    <div id=landing>
        <div class="container">
            <div class="chartContainer top">

                <Chart v-for="chart in charts" v-if="chart.positionTop" :props="chart"/>
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

                <Chart v-for="chart in charts" v-if="!chart.positionTop" :props="chart"/>
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
    const charts = require('../chartConfiguration')
    export default {
        name: 'landing',
        components: {
            Chart,
            Category,
            DashLine
        },
        data: function () {

            return {
                charts
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

        display: flex;
        justify-content: center;
        align-items: center;

        .container {
            width: 90%;
            height: 80%;
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
