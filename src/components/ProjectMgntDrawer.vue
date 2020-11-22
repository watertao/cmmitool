<template>
  <EntityManageDrawer
    :title="title"
    :visible="visible"
    :width="350"
    :submit-enabled="submitEnabled"
    @on-close="onClose"
    @on-submit="onSubmit"
  >
    <a-form-model
      ref="form"
      :model="entity"
      :rules="rules"
      layout="vertical"
    >
      <a-form-model-item prop="id">
        <span slot="label">
          Project ID&nbsp;
          <a-tooltip title="The ID of project in JIRA, looks like: RDSMSPL22-65">
            <a-icon type="question-circle" theme="filled" />
          </a-tooltip>
        </span>
        <a-input-search v-model="entity.id" enter-button @search="onSearch" />
      </a-form-model-item>
      <a-form-model-item label="Project Name">
        <a-input v-model="entity.name" disabled/>
      </a-form-model-item>
    </a-form-model>
  </EntityManageDrawer>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import EntityManageDrawer from '@/common/components/entity-mgnt-drawer/EntityManageDrawer.vue'
import AbstractManageableDrawer from '@/common/components/entity-mgnt-drawer/AbstractManageableDrawer'
import ProjectService, { Project } from '@/service/ProjectService'

@Component({
  components: {
    EntityManageDrawer
  }
})
export default class EstateMgntDrawer extends AbstractManageableDrawer<Project> {
  private rules = {
    id: [
      { required: true, whitespace: true, message: 'Project ID required', trigger: 'blur' }
    ]
  }

  get submitEnabled (): boolean {
    if (this.entity.id && this.entity.name) {
      return true
    } else {
      return false
    }
  }

  get title (): string {
    return this.isCreate ? 'Add Project' : 'View Project Setting'
  }

  onSearch () {
    console.log('adsf')
  }

  protected resetEntity (): any {
    return {
      name: '',
      address: '',
      buildingTypes: []
    }
  }

  protected loadEntityAsync (): Promise<Project> {
    return ProjectService.selectProjectById(this.identity!)
  }

  protected doSubmit (): Promise<void> {
    if (this.isCreate) {
      return ProjectService.createProject(this.entity)
    } else {
      return ProjectService.modifyProject(this.entity)
    }
  }
}
</script>

<style scoped>

</style>
