import axios from 'axios'
import Api from '@/api'

const menu = {
  state: {
    _menus: JSON.parse(sessionStorage.getItem('menus')) || []
  },
  mutations: {
    update(state, menus) {
      state._menus = menus;
      sessionStorage.setItem('menus', JSON.stringify(menus))
    },
    clear(state) {
      state._menus = []
      sessionStorage.removeItem('menus')
    }
  },
  actions: {
    getMenu(context) {
      return new Promise((resolve, reject) => {
        axios.get(Api.menu.menu).then(function (data) {
          context.commit('update', data.data);
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
  getters: {
    menus: state => {
      return state._menus
    }
  }
};

export default menu
