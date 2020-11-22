<template>
  <div id="app">
    <div id="drag-bar">
      <a-tooltip placement="leftTop" v-if="$store.state.session.loginName">
        <template slot="title">
          最大化/最小化
        </template>
        <a id="fullscreen-btn" v-on:click="onFullscreenBtnClick"><a-icon type="block" /></a>
      </a-tooltip>
      <a-tooltip placement="leftTop">
        <template slot="title">
          关闭窗口
        </template>
        <a id="close-btn" v-on:click="onCloseBtnClick"><a-icon type="close" /></a>
      </a-tooltip>
    </div>
    <LoginForm v-if="!$store.state.session.loginName"/>
    <template v-else>
      <Dashboard v-if="!$store.state.project"/>
      <MainStage v-else />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import LoginForm from '@/./components/login/LoginForm.vue'
import MainStage from '@/./components/MainStage.vue'
import Dashboard from '@/components/Dashboard.vue'

const electron = (window as any).require('electron')

@Component({
  components: {
    LoginForm,
    MainStage,
    Dashboard
  }
})
export default class App extends Vue {
  @Prop()
  private session?: Record<string, any>

  onCloseBtnClick () {
    electron.remote.getCurrentWindow().close()
  }

  onFullscreenBtnClick () {
    const win = electron.remote.getCurrentWindow()
    if (win.isFullScreen()) {
      win.setFullScreen(false)
    } else {
      win.setFullScreen(true)
    }
  }

  onChangeSizeBtnClick (): void {
    window.alert('aaaa')
    alert(electron.remote)
    electron.remote.getCurrentWindow().setSize(400, 800, true)
    // remote.getCurrentWindow().setSize(400, 800, true)
  }
}
</script>

<style scoped>
  #drag-bar {
    -webkit-app-region: drag;
    height: 67px;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    transition-delay:0s;
    transition-duration:0.3s;
    transition-property:all;
    transition-timing-function:ease;
  }
  #drag-bar:hover {
    background: rgba(0,0,0,0.05);
  }
  #fullscreen-btn {
    position: fixed;
    z-index: 1000;
    right: 24px;
    top: 3px;
    color: rgba(255,255,255,0.65);
    font-size: 12px;
    width: 14px;
    height: 14px;
    cursor: default;
    -webkit-app-region: no-drag;
  }
  #fullscreen-btn:hover {
    color: rgba(255,255,255,1);
  }
  #close-btn {
    position: fixed;
    z-index: 1000;
    right: 6px;
    top: 3px;
    color: rgba(255,255,255,0.65);
    font-size: 12px;
    width: 14px;
    height: 14px;
    cursor: default;
    -webkit-app-region: no-drag;
  }
  #close-btn:hover {
    color: rgba(255,255,255,1);
  }
</style>
