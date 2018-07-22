import Vue from 'vue';
import Vuex from 'vuex';

import menu from './modules/menu';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {},
  modules: {
    menu,
    user
  }
});

export default store;
