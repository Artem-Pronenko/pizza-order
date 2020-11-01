import Vue from 'vue'
import Vuelidate from 'vuelidate/src'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import messagePlugin from './utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
const firebaseConfig = {
  apiKey: 'AIzaSyDKtxNf_b8J7JPdZM5JXi1KBF6W0yAnrLw',
  authDomain: 'vm-crm-vue-course.firebaseapp.com',
  databaseURL: 'https://vm-crm-vue-course.firebaseio.com',
  projectId: 'vm-crm-vue-course',
  storageBucket: 'vm-crm-vue-course.appspot.com',
  messagingSenderId: '335424210444',
  appId: '1:335424210444:web:c367b204d2345124d99029'
}
firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
