<template>
  <div class="tableUI">
    <h1>Table UI</h1>
    <span class="tableUI__buttons">
      <el-button
              @click="getProductsHandler"
              title="Получить данные"
              icon="el-icon-refresh"
              :disabled="loading"
      >
      </el-button>
    </span>
    <el-divider></el-divider>
    <div class="tableUI__controls">
      <el-row>
        <el-col :span="12">
          <div class="tableUI__setSorting">
            <span style="margin-right: 5px; color: #3D374A; font-size: 14px; font-weight: 600;">Sorting by:</span>
            <el-button
                    v-for="column in selectedColumns"
                    :key="column.prop"
                    :type="column.prop === sortBy ? 'primary' : 'text'"
                    @click="setSorting(column.prop)"
            >{{column.label}}</el-button>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-button
              type="danger"
              size="small"
              :disabled="!selectedItems || !selectedItems.length"
              @click="deleteHandler"
          >Delete</el-button>
          <el-dropdown size="small" @command="setCountPerPage" class="tableUI__setCount">
            <el-button type="default" size="small">
              {{`${tableCount} per page`}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="10"><span>10 per page</span></el-dropdown-item>
              <el-dropdown-item command="15"><span>15 per page</span></el-dropdown-item>
              <el-dropdown-item command="20"><span>20 per page</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="tableUI__pagination">
            <div class="pagination-left">
              <el-button
                  size="small"
                  type="default"
                  icon="el-icon-arrow-left"
                  :disabled="tablePage <= 1"
                  @click="getPrevPage"
              ></el-button>
            </div>
            <div class="pagination-info">{{`${tableOffset + 1}-${tableOffset + tableCount} of ${productsCount}`}}</div>
            <div class="pagination-right">
              <el-button
                  size="small"
                  type="default"
                  icon="el-icon-arrow-right"
                  :disabled="(tablePage + 1) * tableCount > productsCount"
                  @click="getNextPage"
              ></el-button>
            </div>
          </div>
          <el-dropdown size="small" :hide-on-click="false" class="tableUI__selectColumns">
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
    <tableComponent />
  </div>
</template>

<script>
import tableComponent from './components/TableComponent.vue'
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
    tableComponent
  },
  methods: {
    getPrevPage() {
      this.$store.commit('setTablePage', false)
    },
    getNextPage() {
      this.$store.commit('setTablePage', true)
    },
    setCountPerPage(count) {
      this.$store.commit('setCountPerPage', +count)
    },
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
            message: `Recieved items: ${data.length}`,
            type: 'success'
          })
          this.$store.commit('setProducts', data)
        } else {
          this.$message({
            message: 'Recieved 0 items',
            type: 'warning'
          })
        }
      }).catch(({error}) => {
        this.$notify({
          title: 'Error',
          message: error,
          type: 'warning'
        })
      }).finally(() => {this.loading = false})
    },
    deleteHandler() {
      this.$confirm(`Ready to delete: ${this.selectedItems.length}. Continue?`, 'Delete items?', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteProducts(this.selectedItems).then(({message}) => {
          if (message === 'deleted') {
            this.$message({
              message: `Deleted items: ${this.selectedItems.length}`,
              type: 'success'
            })
            this.$store.commit('deleteItems', this.selectedItems)
          }
        }).catch(({error}) => {
          this.$notify({
            title: 'Error',
            message: error,
            type: 'warning'
          })
        })
      }).catch(() => {})
    }
  },
  created() {
    this.getProductsHandler()
  },
  computed: {
    ...mapGetters({
      sortBy: "getColumnSort",
      selectedColumns: 'getSelectedColumns',
      tableColumns: 'getTableColumns',
      tableCount: 'getTableCount',
      tableOffset: 'getTableOffset',
      productsCount: 'getProductsCount',
      tablePage: 'getTablePage',
      selectedItems: 'getSelectedItems'
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
  .tableUI {
    position: relative;
  }
  .tableUI__buttons {
    position: absolute;
    right: 0;
    top: 0;
  }
  .tableUI__setSorting {
    .el-button {
      padding: 5px;
    }
    .el-button--text {
      color: #3D374A;
    }
  }
  .tableUI__pagination {
    display: inline-flex;
    align-items: center;
    margin-left: 10px;
    .pagination-info {
      margin: auto 5px;
    }
    .el-button--small {
      padding: 9px;
    }
  }
  .tableUI__selectColumns {
    margin-left: 10px;
  }
  .tableUI__setCount {
    margin-left: 10px;
  }
</style>
