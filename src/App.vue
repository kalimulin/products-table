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
    <TableComponent
            v-if="productsList && productsList.length"
            :data="productsList"/>
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
    }
  },
  components: {
    TableComponent
  },
  methods: {
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
        console.log(error)
        this.$notify({
          title: 'Данные не получены',
          message: 'Возникла ошибка получения данных',
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
      return this.$store.getters.getProductsList(20,0)
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
</style>
