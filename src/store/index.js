import Vue from 'vue'
import Vuex from 'vuex'
import { pageScrollToBottom } from '@/utils/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    systemInfo: {}, // 系统信息
    messages: [] // 消息集合
  },

  mutations: {
    initSystemInfo (state, payload) {
      state.systemInfo = payload
    },

    pushMessage (state, payload) {
      state.messages = state.messages.concat(payload)
    }
  },

  actions: {
    pushMessage ({ commit }, payload) {
      commit('pushMessage', payload)

      pageScrollToBottom()
    }
  },

  modules: {
  }
})
