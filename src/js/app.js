import Vue from 'vue';
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

import App from '../components/app.vue';
Framework7.use(Framework7Vue);

import store from '../pages/store/store'
import fb from './firebase'
import lodash from 'lodash'
Framework7.use(Framework7Vue, lodash)

let newapp = null
fb.auth().onAuthStateChanged( (user) => {
  if(user && user.emailVerified) {
    store.commit('setSignedIn', true)
    store.commit('setPhotoURL', user.photoURL)
    store.commit('setDisplayName', user.displayName)
    store.commit('setEmail', user.email)
  }else {
    store.commit('setSignedIn', false)
  }

  if(!newapp) {
    newapp = new Vue({
      el: '#app',
      render: (h) => h(App),
      store,
      components: {
        app: App
      },
    });
  }
})