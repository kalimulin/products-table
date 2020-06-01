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
                        :prop="columns[0].prop"
                        sortable="true"
                        :label="columns[0].label"
                        :width="columns[0].width"
                        :sort-orders="['ascending', 'descending']"
                >
                </el-table-column>
                <template
                        v-for="(column, $index) in columns"
                >
                    <el-table-column
                            :key="column.prop"
                            v-if="$index"
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
  }
</script>

<style lang="scss">

</style>
