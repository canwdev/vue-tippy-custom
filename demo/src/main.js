import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "../../src/themes/light.scss";
import VueTippy, {TippyComponent} from '../../src/index'

Vue.use(VueTippy)
Vue.component('tippy', TippyComponent)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
