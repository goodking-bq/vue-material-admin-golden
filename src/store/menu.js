import axios from 'axios'
import Api from '@/api'

const menu = {
  state: {
    _menus: []
  },
  mutations: {
    update(state, menus) {
      state._menus = menus;
    }
  },
  actions: {
    update(context) {
      axios.get(Api.menu.menu).then(function (data) {
        context.commit('update', data.data)
      })
    },
    update_if_null(context) {
      if (!context.menus) {
        console.log('update menu');
        context.dispatch('update')
      }
      else {
        console.log('update menu not need');
      }
    }
  },
  getters: {
    menus: state => {
      return state._menus
    }
  }
};

export default menu
