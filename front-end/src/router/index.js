import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Timeline from '../views/Timeline.vue'
import Story from '../views/Story.vue'
import RequestedFeatures from '../views/RequestedFeatures.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: Timeline
  },
  {
    path: '/story',
    name: 'Story',
    component: Story
  },
  {
    path: '/requested-features',
    name: 'Requested Features',
    component: RequestedFeatures
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
