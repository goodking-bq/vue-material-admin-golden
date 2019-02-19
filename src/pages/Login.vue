<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">登陆</h1>
                </div>
                <v-form lazy-validation ref="form">
                  <v-text-field
                    append-icon="phone_android"
                    name="phone"
                    label="手机号"
                    type="text"
                    v-model="model.phone"
                    :rules="[v => !!v || '电话号码必须填写']"
                    required
                    ref="phone"
                  ></v-text-field>
                  <v-text-field
                    append-icon="code"
                    name="code"
                    label="验证码"
                    id="code"
                    type="text"
                    v-model="model.code"
                    :rules="[v => !!v || '验证码必须填写']"
                  ></v-text-field>
                  <v-layout row wrap>
                    <v-checkbox v-model="model.remember_me" label="记住我" left xs6></v-checkbox>
                    <v-btn
                      v-text="countDown.content"
                      color="info"
                      @click="getSecurityCode"
                      :disabled="!countDown.canClick"
                      :loading="countDown.loading"
                      right
                      xs6
                    ></v-btn>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" @click="login" :loading="loading">登陆</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar :timeout="6000" right :color="$store.state.snackbar.color" v-model="snackbar" top>
      {{ $store.state.snackbar.text }}
      <v-btn dark flat @click.native="snackbar = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Api from "@/api";
import qs from "qs";
export default {
  data: () => ({
    loading: false,
    model: {
      phone: "",
      code: "",
      remember_me: false
    },
    countDown: {
      totalTime: 600,
      content: "发送验证码",
      canClick: true,
      loading: false
    }
  }),
  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar.show;
      },
      set(value) {
        this.$store.commit("setSnackbar", { show: value });
      }
    }
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("Login", this.model)
          .then(() => {
            this.$store.dispatch("getMenu").then(() => {
              this.$router.push({ path: "/" });
            });
          })
          .catch(error => {
            this.loading = false;
          });
      }else{
        console.log('aaa')
      }
    },
    getSecurityCode() {
      if (this.$refs.phone.validate()) {
        this.countDown.loading = true;
        this.$axios
          .post(
            Api.send_security_code,
            qs.stringify({ phone: this.model.phone })
          )
          .then(res => {
            this.$store.commit("setSnackbar", {
              show: true,
              color: "success",
              text: "发送成功,打开微信查看"
            });
            this.countDownClick();
          })
          .catch(error => {
            this.$store.commit("setSnackbar", {
              show: true,
              color: "error",
              text: error.response.data.message
            });
          })
          .then(() => {
            this.countDown.loading = false;
          });
      } else {
        this.$store.commit("setSnackbar", {
          show: true,
          color: "error",
          text: "请输入正确的手机号"
        });
      }
    },
    countDownClick() {
      if (!this.countDown.canClick) {
        return; //改动的是这两行代码
      }
      this.countDown.canClick = false;
      this.countDown.content = this.countDown.totalTime + "s后重新发送";
      let clock = window.setInterval(() => {
        this.countDown.totalTime--;
        this.countDown.content = this.countDown.totalTime + "s后重新发送";
        if (this.countDown.totalTime < 0) {
          window.clearInterval(clock);
          this.countDown.content = "重新发送验证码";
          this.countDown.totalTime = 10;
          this.countDown.canClick = true; //这里重新开启
        }
      }, 1000);
    }
  }
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
