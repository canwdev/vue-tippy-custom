import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
import "tippy.js/themes/light-border.css";

import VueTippy, {TippyComponent} from 'vue-tippy'
Vue.use(VueTippy)
Vue.component('tippy', TippyComponent)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
