import Vue from 'vue'
import App from './App.vue'
import { store } from './store/'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import randomeQuote from './components/RandomQuoteBox.vue'
//import manageQuote from './components/DeleteTest.vue'
import manage from './components/manageQuote.vue'


Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {path:'/', component : randomeQuote},
  {path:'/manageQuote', component: manage}
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  vuetify,
  store,
  router
}).$mount('#app')

