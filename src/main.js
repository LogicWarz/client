import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import VueTypedJs from 'vue-typed-js'

import wysiwyg from 'vue-wysiwyg'
Vue.use(wysiwyg, {
  maxHeight: '500px'
})

Vue.config.productionTip = false
Vue.use(VueTypedJs)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
