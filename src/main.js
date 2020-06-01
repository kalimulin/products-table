import Vue from 'vue'
import ElementUI from 'element-ui';
import './assets/theme.css';
import App from './App.vue'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
