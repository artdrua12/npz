import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "./routes"

import VCharts from 'v-charts'

Vue.use(VueRouter)
Vue.use(VCharts)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
