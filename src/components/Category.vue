<!-- //////// -->
<!-- Template -->
<!-- //////// -->

<template>

    <div class="categoryContainer">
        <div class="title">
            {{name}}
        </div>
    </div>
</template>

<!-- ///////////// -->
<!-- Vue Component -->
<!-- ///////////// -->

<script>

    export default {
        props: ['name'],
        name: 'category',
    }

</script>

<!-- ////// -->
<!-- Styles -->
<!-- ////// -->

<style lang="scss">

    .categoryContainer {
        display: flex;
        .title {
            font-size: 60px;
        }
    }
</style>
