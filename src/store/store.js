import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    columnSort: 'product',
    sortOrder: 'ascending',
    tablePage: 1,
    tableCount: 10,
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
    selectedItems: []
  },
  mutations: {
    setSelectedItems(state, items) {
      state.selectedItems = [...items]
    },
    setTablePage(state, action) {
      state.selectedItems = []
      if (action) {
        const maxPage = Math.ceil(state.products.length / state.tableCount)
        state.tablePage = maxPage >= (state.tablePage + 1) ? state.tablePage + 1 : maxPage
      } else {
        state.tablePage = (state.tablePage - 1) >= 1 ? state.tablePage - 1 : 1
      }
    },
    setCountPerPage(state, count) {
      state.selectedItems = []
      state.tablePage = Math.floor(state.tablePage * (state.tableCount / count))
      state.tableCount = count
    },
    setSortOrder(state, order) {
      state.selectedItems = []
      state.sortOrder = order
    },
    setProducts (state, data) {
      state.products = [...data]
    },
    setColumnSort(state, column) {
      state.selectedItems = []
      state.columnSort = column
    },
    selectColumn(state, {column, event}) {
      state.selectedItems = []
      const columns = [...state.tableColumns]
      const col = columns.find(i => i.prop === column.prop)
      col.visible = event
      state.tableColumns = columns
    },
    selectAllColumns(state, event) {
      state.selectedItems = []
      state.tableColumns = state.tableColumns.map(col => ({...col, visible: event}))
    },
    deleteItems(state, items) {
      state.products = state.products.filter(product => {
        return !items.find(i => i.id === product.id)
      })
      state.selectedItems = []
    }
  },
  getters: {
    getSelectedItems(state) {
      return state.selectedItems
    },
    getSelectedColumns(state) {
      return state.tableColumns.filter(column => column.visible)
    },
    getTableColumns(state) {
      return state.tableColumns
    },
    getSortOrder(state) {
      return state.sortOrder
    },
    getTablePage(state) {
      return state.tablePage
    },
    getTableCount(state) {
      return state.tableCount
    },
    getTableOffset(state) {
      return (state.tablePage - 1) * state.tableCount
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
    },
    getProductsCount(state) {
      return state.products.length
    }
  },
})