// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import './theme/default.styl';
import 'font-awesome/css/font-awesome.css';
import axios from 'axios'
import store from './store';
import Util from './util'
console.log(process.env);
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post["X-CSRFToken"] = Util.getCookie('_csrf_token');
Vue.prototype.$ajax = axios;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.indigo.base, // #E53935
  //   secondary: colors.indigo.lighten4, // #FFCDD2
  //   accent: colors.indigo.base // #3F51B5
  // },
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {},
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
