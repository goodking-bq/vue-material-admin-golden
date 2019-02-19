import Vue from 'vue';
import Vuex from 'vuex';

import menu from './modules/menu';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //
    snackbar: {
      show: false,
      text: "",
      color: ""
    }
  },
  mutations: {
    //
    setSnackbar(state, data) {
      if (data.color) {
        state.snackbar.color = data.color
      }
      if (data.text) {
        state.snackbar.text = data.text
      }
      state.snackbar.show = data.show
    }
  },
  actions: {},
  modules: {
    menu,
    user
  }
});

export default store;
