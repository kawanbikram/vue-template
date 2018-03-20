
import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations, getters } from './mutations'
import actions from './actions'
import MonitorMutations from './plugins/monitorMutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: true,
  plugins: [MonitorMutations],
})
