import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: '/emplois',
    name: 'Emplois',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Serp.vue')
  },
  {
    path: '/emplois/:id',
    name: "Detail",
    component: () => import('../views/Detail.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
