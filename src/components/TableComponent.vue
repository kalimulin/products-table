<template>
  <div class="table-component">
    <template
        v-if="productsList && productsList.length"
    >
      <el-table
          :data="productsList"
          stripe
          empty-text="Нет данных"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="sortColumn"
      >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            :prop="sortedColumns[0].prop"
            sortable="true"
            :label="sortedColumns[0].label"
            :width="sortedColumns[0].width"
            :sort-orders="['ascending', 'descending']"
        >
        </el-table-column>
        <template
            v-for="(column, $index) in sortedColumns"
        >
          <el-table-column
              :key="column.prop"
              v-if="$index && column.visible"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
          ></el-table-column>
        </template>
        <el-table-column label="">
          <template slot-scope="scope">
            <el-popconfirm
                title="Are you sure you want to delete item?"
                confirmButtonText="Ok"
                cancelButtonText="Cancel"
                @onConfirm="deleteHandler(scope.row)"
            >
              <el-button
                  size="small" class="delete-item-button" type="text"
                  icon="el-icon-delete" slot="reference">
                Delete
              </el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </template>
    <div v-else style="text-align: center">No data</div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {deleteProducts} from "../api/request";
  export default {
    name: 'TableComponent',
    data() {
      return {
        multipleSelection: []
      }
    },
    methods: {
      handleSelectionChange(items) {
        this.$store.commit('setSelectedItems', items)
      },
      sortColumn({order}) {
        this.$store.commit('setSortOrder', order)
      },
      deleteHandler(product) {
        deleteProducts([product]).then(({message}) => {
          if (message === 'deleted') {
            this.$message({
              message: 'Success!',
              type: 'success'
            })
            this.$store.commit('deleteItems', [product])
          }
        }).catch(({error}) => {
          this.$notify({
            title: 'Error',
            message: error,
            type: 'warning'
          })
        })
      }
    },
    computed: {
      ...mapGetters({
        columns: 'getTableColumns',
        sortBy: 'getColumnSort',
        sortOrder: 'getSortOrder',
        tableCount: 'getTableCount',
        tableOffset: 'getTableOffset',
      }),
      productsList() {
        return this.$store.getters.getProductsList(this.sortBy, this.sortOrder, this.tableCount,this.tableOffset)
      },
      sortedColumns() {
        const columns = [...this.columns]
        columns.sort((a, b) => {
          if (a.prop === this.sortBy) {
            return -1
          }
          if (b.prop === this.sortBy) {
            return 1
          }
          return 0
        })
        return columns
      }
    }
  }
</script>

<style lang="scss">
  .delete-item-button {
    display: none;
    padding: 0;
    color: #5B5E77;
  }
  .el-table__row:hover .delete-item-button {
    display: block;
  }

</style>
