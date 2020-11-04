import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import DBSet from '@/store/DBSet'
import DBGet from '@/store/DBGet'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    userId: ''
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    user_id(state, userId) {
      state.userId = userId
    }
  },
  getters: {
    error: s => s.error,
    UID(state) {
      return state.userId
    }
  },
  modules: {
    auth,
    DBSet,
    DBGet
  }
})
