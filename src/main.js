import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "tippy.js/themes/light.css";
import VueTippy, {TippyComponent} from '@/components/TippyVue'
Vue.use(VueTippy)
Vue.component('tippy', TippyComponent)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
