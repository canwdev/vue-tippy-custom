import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import clickOutside from './directives/click-outside'

Vue.directive('clickOutside', clickOutside)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
