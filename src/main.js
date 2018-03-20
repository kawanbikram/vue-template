
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Meta from 'vue-meta'

import App from './components/App.vue'
import router from './router'
import store from './store'
import './filters'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Meta)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
