import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/TopicsDictionary.vue'
import Topics from '../pages/topics/_id.vue'
import PageNotFound from '../components/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/topics/:id',
    name: 'topics',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Topics
  },
  {
    path: "/error/:id",
    name: 'error',
    component: PageNotFound
  },
  {
    path: "*",
    component: PageNotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
