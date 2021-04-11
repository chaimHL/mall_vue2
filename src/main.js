import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import toast from '@/components/common/Toast/index.js'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(toast)
Vue.use(VueLazyLoad, {
  loading: require('./assets/imgs/placeholder.png')
})

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
