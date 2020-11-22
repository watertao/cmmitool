<template>
  <div id="main-stage">

    <div id="banner">
      <img height="26" alt="7street" src="../assets/logo-white.svg"/>
      <span class="brand-text">CMMI TOOL</span>
      <span id="version">{{ version }}</span>
    </div>

    <div id="banner-placeholder"></div>

    <a-layout style="min-height: calc(100vh - 67px)">
      <a-layout-sider v-model="collapsed" style="background: white;" collapsible>
        <a-menu v-on:select="onMenuItemSelect" style="height: 100%" theme="light" :default-selected-keys="['BatchManagement']" mode="inline">
          <a-menu-item key="SystemSetting"><a-icon type="setting" /><span>系统管理</span></a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="height: calc(100vh - 67px);">
        <a-layout-header style="background: #fff; padding-left: 24px; padding-top: 5px;">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item v-for="(item, i) in $store.state.route.breadcrumb" v-bind:key="i">
              <span v-if="i == ($store.state.route.breadcrumb.length - 1)">{{ item.breadcrumbName }}</span>
              <a item="item" v-on:click="onBreadcrumbItemClick(item)" v-else>{{ item.breadcrumbName }}</a>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-layout-header>
        <a-layout-content style="margin: 16px; height: calc(100vh - 138px); overflow-x: hidden; position: relative;">
          <component :is="$store.state.route.component"></component>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SystemSetting from './system/SystemSetting.vue'
import infras from '@/common/infras'

@Component({
  components: {
    SystemSetting
  }
})
export default class MainStage extends Vue {
  private collapsed = false
  private version: string

  constructor () {
    super()
    this.version = 'asdfg'
  }

  onMenuItemSelect ({ item, key, selectedKeys }: any) {
    this.$store.commit('updateRouteComponent', key)
  }

  onBreadcrumbItemClick (item: any) {
    this.$store.commit('updateRouteComponent', item.component)
  }
}
</script>

<style scoped>
  #banner-placeholder {
    height: 67px;
  }
  #banner {
    height: 67px;
    background-image: linear-gradient(30deg , #4CB5F8 , #7681FF);
    padding: 0 24px 0 24px;
    vertical-align: center;
    box-shadow: 0 3px 5px #bbb;
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  #banner img {
    position: absolute;
    left: 24px;
    top: 20px;
  }
  #banner .brand-text {
    /* margin-left: 8px; */
    /* line-height: 26px; */
    font-size: 15px;
    /* height: 26px; */
    font-weight: 600;
    position: absolute;
    left: 62px;
    top: 23px;
    color: white;
  }
  #version {
    position: absolute;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
    right: 23px;
    top: 32px;
  }
</style>

<style>
  .ant-layout-sider-trigger {
    background: #4CB5F8 !important;
  }
  ul.ant-menu-root {
    padding-top: 8px;
  }
</style>
