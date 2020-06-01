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
    getProductsList: state => (prop = 'product', order = 'ascending', count = 10, offset = 0) => {
      const products = [...state.products]
      products.sort((a,b) => {
        if (a[prop] > b[prop]) {
          return order === 'ascending' ? 1 : -1
        } else if ((a[prop] < b[prop])) {
          return order === 'ascending' ? -1 : 1
        } else {
          return 0
        }
      })
      return products.slice(offset, count+offset);
    }
  },
})