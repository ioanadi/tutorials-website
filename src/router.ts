import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/tutorials/', 
      component: () => import(/* webpackChunkName: "vglex" */ './views/Tutorials.vue'),
      children: [
        {
          path: '/tutorials/repulsion', name: 'repulsion',
          component: () => import(/* webpackChunkName: "repulsion" */ './views/tutorials/RepulsionEffect.vue')
        },
        {
          path: '/tutorials/fan', name: 'fan',
          component: () => import(/* webpackChunkName: "fan" */ './views/tutorials/Fan.vue')
        },
        {
          path: '/tutorials/fan-extended', name: 'fan-extended',
          component: () => import(/* webpackChunkName: "fanEx" */ './views/tutorials/FanExtended.vue')
        },
        {
          path: '/tutorials/explosion', name: 'explosion',
          component: () => import(/* webpackChunkName: "explosion" */ './views/tutorials/Explosion.vue')
        }
      ],
    }
  ]
})
