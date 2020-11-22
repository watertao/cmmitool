<template>
  <div id="main-stage">

    <div id="banner">
      <img height="26" alt="7street" src="../assets/logo-white.svg"/>
      <span class="brand-text">CMMI TOOL</span>
      <span id="version">{{ version }}</span>
    </div>

    <div id="banner-placeholder"></div>

    <div style="min-height: calc(100vh - 67px); background: #f0f2f5; padding: 16px;">
      <div style="min-height: calc(100vh - 99px; overflow-x: hidden; position: relative;">
        <a-list :span="12" :grid="{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }" :data-source="projects">
          <a-list-item slot="renderItem" slot-scope="project">
            <a-card v-if="project.id" hoverable>
              <template slot="actions" class="ant-card-actions">
                <a-icon key="setting" type="setting" />
                <a-icon key="delete" type="delete" />
              </template>
              <a-card-meta title="开二-托管综合业务管理系统【敏态】" description="KETGYWZHGL">
                <a-avatar
                  slot="avatar"
                  src="../assets/logo2.png"
                />
              </a-card-meta>
            </a-card>
            <a-button @click="onProjectCreateBtnClick" type="dashed" style="width: 100%;" v-else>添加</a-button>
          </a-list-item>
        </a-list>
        <ProjectMgntDrawer
          :visible="projectMgntDrawerVisible"
          :identity="currentModifyProjectId"
          @on-close="onProjectMgntDrawerClose"
          @on-saved="reloadProjects"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SystemSetting from './system/SystemSetting.vue'
import infras from '@/common/infras'
import LocalStoreService from '@/service/LocalStoreService'
import ProjectMgntDrawer from '@/components/ProjectMgntDrawer.vue'
import ProjectService, { Project } from '@/service/ProjectService'

@Component({
  components: {
    ProjectMgntDrawer
  }
})
export default class MainStage extends Vue {
  private collapsed = false
  private version: string
  private projects: any = []
  private projectMgntDrawerVisible = false
  private currentModifyProjectId = ''

  constructor () {
    super()
    this.version = 'asdfg'
  }

  mounted () {
    this.reloadProjects()
  }

  onProjectMgntDrawerClose () {
    this.projectMgntDrawerVisible = false
  }

  reloadProjects () {
    ProjectService.retrieveProjects().then((projects: Project[]) => {
      this.projects = [...projects, {}]
    })
  }

  onProjectCreateBtnClick () {
    this.currentModifyProjectId = ''
    this.projectMgntDrawerVisible = true
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
    font-size: 15px;
    font-weight: 300;
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
