<template>
  <div id="app">
    <h1>Table UI</h1>
    <span class="buttons">
      <el-button
              @click="getProductsHandler"
              title="Получить данные"
              icon="el-icon-refresh"
              :disabled="loading"
      >
      </el-button>
    </span>
    <hr style="background-color: #EDEDED;height: 1px;border-width: 0;">
    <div class="controls">
      <el-row>
        <el-col :span="12">
          <div class="set-sorting">
            <span>Sorting by:</span>
            <el-button
                    v-for="column in tableColumns"
                    :key="column.prop"
                    :type="column.prop === sortBy ? 'primary' : 'text'"
                    @click="setSorting(column.prop)"
            >{{column.label}}</el-button>
          </div>
        </el-col>
        <el-col :span="12">{{sortBy}}</el-col>
      </el-row>
    </div>
    <TableComponent
            v-if="productsList && productsList.length"
            :data="productsList"
            :columns="sortedColumns"
            :sort-by="sortBy"
            @sortColumn="sortColumn"
    />
  </div>
</template>

<script>
import TableComponent from './components/TableComponent.vue'
import {deleteProducts, getProducts} from './api/request'

export default {
  name: 'App',
  data() {
    return {
      loading: false,
      sortBy: 'product',
      sortOrder: 'ascending',
      tableCount: 20,
      tableOffset: 0,
      tableColumns: [
        {
          label: 'Product(100g serving)',
          prop: 'product',
          sortable: false,
          width: 250
        },
        {
          label: 'Calories',
          prop: 'calories',
          sortable: false,
          width: null
        },
        {
          label: 'Fat (g)',
          prop: 'fat',
          sortable: false,
          width: null
        },
        {
          label: 'Carbs (g)',
          prop: 'carbs',
          sortable: false,
          width: null
        },
        {
          label: 'Protein (g)',
          prop: 'protein',
          sortable: false,
          width: null
        },
        {
          label: 'Iron (%)',
          prop: 'iron',
          sortable: false,
          width: null
        },
      ]
    }
  },
  components: {
    TableComponent
  },
  methods: {
    sortColumn(order) {
      this.sortOrder = order
    },
    setSorting(prop) {
      this.sortBy = prop
    },
    getProductsHandler() {
      this.loading = true
      getProducts().then(data => {
        if (data && data.length) {
          this.$message({
            message: `Получено позиций: ${data.length}`,
            type: 'success'
          })
          this.$store.commit('setProducts', data)
        } else {
          this.$message({
            message: 'Получено 0 позиций',
            type: 'warning'
          })
        }
      }).catch(({error}) => {
        this.$notify({
          title: 'Ошибка получения данных',
          message: error,
          type: 'warning'
        })
      }).finally(() => {this.loading = false})
    },
    deleteHandler(id) {
      deleteProducts(id).then(data => { console.log(data) }).catch((err) => {console.log(err)})
    }
  },
  created() {
    this.getProductsHandler()
  },
  computed: {
    productsList() {
      return this.$store.getters.getProductsList(this.sortBy, this.sortOrder, this.tableCount,this.tableOffset)
    },
    sortedColumns() {
      return [...this.tableColumns].sort((a,b) => {
        if (a.prop === this.sortBy) { return -1 }
        if (b.prop === this.sortBy) { return 1 }
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');
  body {
    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 32px;
    font-size: 14px;
    line-height: 24px;
  }
  h1 {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
  }
  #app {
    position: relative;
  }
  span.buttons {
    position: absolute;
    right: 0;
    top: 0;
  }
  .set-sorting {
    .el-button {
      padding: 5px;
    }
    .el-button--text {
      color: #3D374A;
    }
  }
</style>
