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
    <el-divider></el-divider>
    <div class="controls">
      <el-row>
        <el-col :span="12">
          <div class="set-sorting">
            <span>Sorting by:</span>
            <el-button
                    v-for="column in selectedColumns"
                    :key="column.prop"
                    :type="column.prop === sortBy ? 'primary' : 'text'"
                    @click="setSorting(column.prop)"
            >{{column.label}}</el-button>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-dropdown size="small" :hide-on-click="false">
            <el-button type="default" size="small">
              {{`${selectedColumns.length} of ${tableColumns.length} columns selected`}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-checkbox checked @change="selectAllColumns">Select all</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item
                      v-for="column in tableColumns"
                      :key="column.prop"
              ><el-checkbox v-model="column.visible" @change="selectColumn(column, $event)">{{column.label}}</el-checkbox></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <TableComponent />
  </div>
</template>

<script>
import TableComponent from './components/TableComponent.vue'
import {deleteProducts, getProducts} from './api/request'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      loading: false,
    }
  },
  components: {
    TableComponent
  },
  methods: {
    selectAllColumns(event) {
      this.$store.commit('selectAllColumns', event)
    },
    selectColumn(column, event) {
      this.$store.commit('selectColumn', {column, event})
    },
    setSorting(prop) {
      this.$store.commit('setColumnSort', prop)
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
    ...mapGetters({
      sortBy: "getColumnSort",
      selectedColumns: 'getSelectedColumns',
      tableColumns: 'getTableColumns'
    }),
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
