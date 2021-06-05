import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Payment from '../views/Payment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
