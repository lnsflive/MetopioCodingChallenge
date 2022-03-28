import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/TopicsDictionary.vue'
import Topics from '../pages/topics/_id.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
