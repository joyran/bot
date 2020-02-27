import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import './styles/global.less'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://www.yinmengran.cn:8026/' : 'http://127.0.0.1:8026/'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
