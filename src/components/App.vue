<!-- //////// -->
<!-- Template -->
<!-- //////// -->

<template lang="pug">

#app__inner

  #navigation
    navigation

  #wrapper
    router-view

  #footer
    page-footer

</template>

<!-- ///////////// -->
<!-- Vue Component -->
<!-- ///////////// -->

<script>

import Navigation from './Navigation.vue';
import Footer from './Footer.vue';

export default {
  name: 'app',
  components: {
    navigation: Navigation,
    pageFooter: Footer,
  },
  mounted() {
    this.$store.dispatch('getCount')
  },
}

</script>

<!-- ////// -->
<!-- Styles -->
<!-- ////// -->

<style lang="scss">

#navigation {
  width: 100%;
  max-width: 100%;
  height: 50px;

}

#wrapper {
  display: flex;
    height: 85vh;
}

</style>
