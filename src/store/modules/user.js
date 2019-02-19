import axios from 'axios'
import Api from '@/api'
import qs from "qs";
import Util from "@/util"
const user = {
  state: {
    isLogin: sessionStorage.getItem('isLogin') || ''
  },
  mutations: {
    setLogin(state) {
      state.isLogin = true;
      console.log('set session')
      sessionStorage.setItem('isLogin', state.isLogin)
    },
    setLogOut(state) {
      state.isLogin = false;
      sessionStorage.removeItem('isLogin')
    }
  },
  actions: {
    Login(context, data) {
      const phone = data.phone.trim();
      const code = data.code.trim();
      const remember_me = data.remember_me;
      const fromData = qs.stringify({
        phone: phone,
        code: code,
        remember_me: remember_me
      })
      console.log(Util.getCookie('_csrf_token'))
      return new Promise((resolve, reject) => {
        axios({
          url: Api.login,
          method: "post",
          data: fromData,
          headers: {
            "X-CSRFToken": Util.getCookie('_csrf_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          //if (res.data.status === 0) {
            context.commit('setLogin');
         //
          resolve(res);
        }).catch(error => {
          console.log(error.response)
          context.commit("setSnackbar", {
            text: "登陆失败: " + error.response.data.message,
            color: "error",
            show: true
          })
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
