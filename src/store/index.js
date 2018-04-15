import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actives'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
// createLogger 提供日志功能
Vue.use(Vuex)

// 在开发环境开启调试模式
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
