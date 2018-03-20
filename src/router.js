import VueRouter from 'vue-router'

import Landing from './components/Landing.vue'
import Details from './components/Details.vue'

// Routing
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: Landing,
      props: true,
    },
    {
      path: '/details/:thing',
      name: 'details-page',
      component: Details,
      props: true,
    },
  ],
})

router.beforeEach((to, from, next) => {
  // Do things based off url
  // if (to.name == 'home') {
  //   Do thing
  // }
  next()
})

export default router
