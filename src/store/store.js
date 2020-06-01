import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    columnSort: 'product',
    sortOrder: 'ascending',
    tableCount: 10,
    tableOffset: 0,
    tableColumns: [
      {
        label: 'Product(100g serving)',
        prop: 'product',
        sortable: false,
        width: 250,
        visible: true
      },
      {
        label: 'Calories',
        prop: 'calories',
        sortable: false,
        width: null,
        visible: true
      },
      {
        label: 'Fat (g)',
        prop: 'fat',
        sortable: false,
        width: null,
        visible: true
      },
      {
        label: 'Carbs (g)',
        prop: 'carbs',
        sortable: false,
        width: null,
        visible: true
      },
      {
        label: 'Protein (g)',
        prop: 'protein',
        sortable: false,
        width: null,
        visible: true
      },
      {
        label: 'Iron (%)',
        prop: 'iron',
        sortable: false,
        width: null,
        visible: true
      },
    ],
  },
  mutations: {
    setSortOrder(state, order) {
      state.sortOrder = order
    },
    setProducts (state, data) {
      state.products = [...data]
    },
    setColumnSort(state, column) {
      state.columnSort = column
    },
    selectColumn(state, {column, event}) {
      const columns = [...state.tableColumns]
      const col = columns.find(i => i.prop === column.prop)
      col.visible = event
      state.tableColumns = columns
    },
    selectAllColumns(state, event) {
      state.tableColumns = state.tableColumns.map(col => ({...col, visible: event}))
    },
  },
  getters: {
    getSelectedColumns(state) {
      return state.tableColumns.filter(column => column.visible)
    },
    getTableColumns(state) {
      return state.tableColumns
    },
    getSortOrder(state) {
      return state.sortOrder
    },
    getTableCount(state) {
      return state.tableCount
    },
    getTableOffset(state) {
      return state.tableOffset
    },
    getColumnSort(state) {
      return state.columnSort
    },
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