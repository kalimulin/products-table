<template>
    <div class="table-component">
        <template>
            <el-table
                    :data="data"
                    stripe
                    empty-text="Нет данных"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="Id"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="product"
                        label="Product"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="calories"
                        label="Calories">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
  export default {
    name: 'TableComponent',
    props: {
      data: Array
    }
  }
</script>

<style lang="scss">

</style>
