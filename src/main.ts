import Vue from 'vue'
import * as VueGL from "vue-gl"
import App from './App.vue'
import VueScrollmagic from 'vue-scrollmagic'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faCircle, faShapes, faSquare, faPlay, faShareAlt, faCode, faCube, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import router from './router'
import store from './store'
import './registerServiceWorker'

library.add(
    faUserSecret, faLinkedin, faFacebook, faGithub, faCircle, 
    faShapes, faSquare, faPlay, faShareAlt,faCode, faCube, faEnvelope 
)
Vue.use(VueScrollmagic)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Object.keys(VueGL).forEach(name => {
    Vue.component(name, (VueGL as any)[name]);
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
