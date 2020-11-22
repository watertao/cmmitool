<template>
  <div id="login-form">
    <div id="logo-container">
      <img height="26" src="../../assets/logo-white.svg"/>
      <span class="brand-text">CMMI TOOL</span>
    </div>
    <div id="main-logo">
      <img src="../../assets/logo-white.svg"/>
    </div>
    <div id="app-name">CMMI TOOL</div>
    <a-input ref="usernameField" placeholder="user name of JIRA" class="input-cls " v-model="username" pla/>
    <a-input ref="passwordField" placeholder="password of JIRA" type="password" style="margin-top: 16px;" class="input-cls " v-model="password"/>
    <a-button :loading="loading" id="login-btn" type="primary" v-on:click='onLoginBtnClick'>Login</a-button>
    <div id="version">{{ version }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import infras from '@/common/infras'

const electron = (window as any).require('electron')

@Component({
  components: {
  }
})
export default class LoginForm extends Vue {
  private loading!: boolean
  private username!: string
  private password!: string
  private usernameFieldRef!: HTMLInputElement
  private passwordFieldRef!: HTMLInputElement
  private version = 'V1.0.0'

  constructor () {
    super()
    this.loading = false
    this.username = ''
    this.password = ''
  }

  mounted () {
    this.usernameFieldRef = (this.$refs.usernameField as HTMLInputElement)
    this.passwordFieldRef = (this.$refs.passwordField as HTMLInputElement)
    this.usernameFieldRef.focus()
  }

  onLoginBtnClick () {
    if (!this.username) {
      this.$message.warn('user name required')
      this.usernameFieldRef.focus()
      return
    }
    if (!this.password) {
      this.$message.warn('password required')
      this.passwordFieldRef.focus()
      return
    }
    this.loading = true
    this.$store.dispatch('login', { username: this.username, password: this.password })
      .then(() => {
        this._hideWin().then(() => {
          electron.remote.getCurrentWindow().setSize(1240, 800, false)
          electron.remote.getCurrentWindow().center()
          electron.remote.getCurrentWindow().setResizable(true)
          electron.remote.getCurrentWindow().setMinimumSize(1240, 800)
          this._displayWin()
        })
      })
      .catch(err => {
        this.$message.warn(err.message)
      })
      .finally(() => {
        this.loading = false
      })
  }

  _hideWin () {
    const win = electron.remote.getCurrentWindow()
    return new Promise(resolve => {
      let opacity = 1
      const step = 0.1
      const func = () => {
        opacity -= step
        if (opacity >= 0) {
          win.setOpacity(opacity)
          requestAnimationFrame(func)
        } else {
          resolve()
        }
      }
      requestAnimationFrame(func)
    })
  }

  _displayWin () {
    const win = electron.remote.getCurrentWindow()
    let opacity = 0
    const step = 0.1
    const func = () => {
      opacity += step
      if (opacity <= 1) {
        win.setOpacity(opacity)
        requestAnimationFrame(func)
      }
    }
    requestAnimationFrame(func)
  }
}
</script>

<style scoped>
  #login-form {
    width: 100%;
    background-image: url(../../assets/login-bg.png);
    background-repeat: no-repeat;
    text-align: center;
    padding: 24px 24px 11px 24px;
    -webkit-user-select: none;
  }
  #logo-container {
    height: 26px;
    text-align: left;
    color: white;
  }
  #logo-container .brand-text {
    margin-left: 8px;
    line-height: 26px;
    font-size: 12px;
    height: 26px;
    font-weight: 600;
    font-weight: 300;
  }
  #main-logo {
    height: 152px;
    margin-top: 56px;
  }
  #main-logo img {
    opacity: 0.65;
  }
  #app-name {
    color: white;
    font-size: 32px;
    font-weight: 100;
  }
  .input-cls {
    margin-top: 24px;
    background: rgba(0,0,0,0.05);
    color: white;
    border-color: rgba(255,255,255, 0.65);
  }
  .input-cls:hover {
    border-color: rgba(255,255,255, 1);
    background: rgba(0,0,0,0.15);
  }
  .input-cls:focus {
    border-color: rgba(255,255,255, 1);
    box-shadow: 0 0 0 2px rgba(255,255,255, 0.2);
    background: rgba(0,0,0,0.15);
  }
  .input-cls::placeholder {
    color: rgba(255,255,255, 0.65);
  }
  #login-btn {
    margin-top: 24px;
    width: 100%;
    background: transparent;
    border-color: rgba(255,255,255,0.65);
    color: rgba(255,255,255,0.8);
  }
  #login-btn:hover {
    border-color: rgba(255,255,255,1);
    color: rgba(255,255,255,1);
    background-color: rgba(255,255,255,0.05);
  }
  #version {
    color: rgba(255,255,255,0.65);
    margin-top: 42px;
    font-size: 10px;
  }
</style>
