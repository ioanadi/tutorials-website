import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/vue-gl', 
      component: () => import(/* webpackChunkName: "vglex" */ './views/VGLExamples.vue'),
      children: [
        {
          path: '/vue-gl/repulsion', name: 'repulsion',
          component: () => import(/* webpackChunkName: "repulsion" */ './views/vgl-examples/RepulsionEffect.vue')
        },
        {
          path: '/vue-gl/cube', name: 'cube',
          component: () => import(/* webpackChunkName: "cube" */ './views/vgl-examples/Cube.vue')
        },
        {
          path: '/vue-gl/lights', name: 'lights',
          component: () => import(/* webpackChunkName: "lights" */ './views/vgl-examples/Lights.vue')
        },
      ]
    },
    {
      path: '/simples', 
      component: () => import(/* webpackChunkName: "simples" */ './views/SimpleExamples.vue'),
      children: [
        {
          path: '/simples/fan', name: 'fan',
          component: () => import(/* webpackChunkName: "fan" */ './views/simple-examples/Fan.vue')
        },
        {
          path: '/simples/fan-extended', name: 'fan-extended',
          component: () => import(/* webpackChunkName: "fanEx" */ './views/simple-examples/FanExtended.vue')
        },
        {
          path: '/simples/explosion', name: 'explosion',
          component: () => import(/* webpackChunkName: "paint" */ './views/simple-examples/Explosion.vue')
        }
      ],
    }
  ]
})
