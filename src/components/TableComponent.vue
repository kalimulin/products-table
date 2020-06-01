<template>
    <div class="table-component">
        <template>
            <el-table
                    :data="data"
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
            </el-table>
        </template>
    </div>
</template>

<script>
  export default {
    name: 'TableComponent',
    props: {
      data: Array,
      columns: Array,
      sortBy: String
    },
    data() {
      return {
        multipleSelection: []
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sortColumn({order}) {
        this.$emit('sortColumn', order)
      }
    },
    computed: {
      sortedColumns() {
        const columns = [...this.columns]
        columns.sort((a,b) => {
          console.log(a.prop, this.sortBy)
          if (a.prop === this.sortBy) { return -1 }
          if (b.prop === this.sortBy) { return 1 }
          return 0
        })
        return columns
      }
    }
  }
</script>

<style lang="scss">

</style>
