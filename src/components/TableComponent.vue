<template>
    <div class="table-component">
        <template>
            <el-table
                    :data="data"
                    stripe
                    empty-text="Нет данных"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        v-for="column in columns"
                        :key="column.prop"
                        :prop="column.prop"
                        :sortable="column.prop === sortBy"
                        :label="column.label"
                        :width="column.width"
                >
                </el-table-column>

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
      }
    }
  }
</script>

<style lang="scss">

</style>
