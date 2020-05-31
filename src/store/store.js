import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    setProducts (state, data) {
      state.products = [...data]
    }
  },
  getters: {
    getProductsList: state => (count = 20, offset = 0) => {
      return state.products.slice(offset, count+offset);
    }
  }
})