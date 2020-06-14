import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Accueil',
    component: Home,
    meta: {
      breadcrumb: [
        {name : 'Accueil'}
      ]
    }
  },
  {
    path: '/emplois',
    name: 'Emplois',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Serp.vue'),
    meta: {
      breadcrumb: [
        {name : 'Accueil', link: '/'},
        {name : 'Emplois'}
      ]
    }
  },
  {
    path: '/emplois/:id',
    name: "Detail",
    component: () => import('../views/Detail.vue'),
    meta: {
      breadcrumb: [
        {name : 'Accueil', link: '/'},
        {name : 'Emplois', link: '/emplois'},
        {name : ':id'}
      ]
    }
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
