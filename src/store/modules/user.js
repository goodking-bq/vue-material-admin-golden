import request from '@/util/request'
import Api from '@/api'

const user = {
  state: {
    isLogin: sessionStorage.getItem('isLogin') || ''
  },
  mutations: {
    setLogin(state) {
      state.isLogin = true;
      sessionStorage.setItem('isLogin', state.isLogin)
    },
    setLogOut(state) {
      state.isLogin = false;
      sessionStorage.removeItem('isLogin')
    }
  },
  actions: {
    Login(context, data) {
      const name = data.username.trim();
      const password = data.password.trim();
      return new Promise((resolve, reject) => {
        request({
          url: Api.login,
          data: {username: name, password: password},
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(res => {
          if (res.data.status === 0) {
            context.commit('setLogin');
          }
          resolve(res);
        }).catch(error => {
          reject(error)
        })
      })
    },
    LogOut(context) {
      return new Promise((resolve, reject) => {
        axios.get(Api.logout).then((res) => {
          context.commit('setLogOut');
          context.commit('clear');
          resolve(res);
        }).catch(error => {
          reject(error)
        })
      })
    },

  },
  getters: {
    logined: state => {
      return state.isLogin
    },
  },
}

export default user
