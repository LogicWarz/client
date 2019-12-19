import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import VueTypedJs from 'vue-typed-js'
import VueConfetti from 'vue-confetti'
import wysiwyg from 'vue-wysiwyg'
import VuetifyToast from 'vuetify-toast-snackbar'
import GSignInButton from 'vue-google-signin-button';
Vue.use(VueTypedJs)
Vue.use(VueConfetti)
Vue.use(GSignInButton);
Vue.use(wysiwyg, {
  maxHeight: '500px'
})
Vue.use(VuetifyToast, {
  x: 'right', // default
  y: 'bottom', // default
  color: 'info', // default
  icon: 'info',
  iconColor: '', // default
  classes: [
    'body-2'
  ],
  timeout: 3000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: false, // default
  closeText: '', // default
  closeIcon: 'close', // default
  closeColor: '', // default
  slot: [],
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  property: '$toast' // default
})
Vue.config.productionTip = false

// Vue.filter('truncate', function (value, limit) {
//   if (value.length > limit) {
//       value = value.substring(0, (limit - 3)) + '...';
//   }

//   return value
// })

Vue.directive('trim', {
  inserted: function (el) {
    var str = el.innerHTML
    var resultString = str.split(' ').slice(0, 50).join(' ') + ' ... <a>[ Read More ]</a>'
    el.innerHTML = resultString
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
