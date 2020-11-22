<template>
  <a-drawer
    :title="title"
    placement="right"
    :closable="false"
    :visible="visible"
    :width="width"
    :get-container="false"
    @close="onClose"
    :wrap-style="{ position: 'absolute' }"
  >
    <div style="padding: 0px 0px 48px 0px;">
      <slot></slot>
    </div>
    <div
      :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
    >
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="onSubmit" :disabled="!submitEnabled">提交</a-button>
      </a-space>
    </div>
  </a-drawer>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class EntityManageDrawer extends Vue {
  @Prop({ default: '' }) private title?: string
  @Prop() private visible = false
  @Prop({ default: 350 }) private width?: number
  @Prop({ default: true }) private submitEnabled?: boolean

  onClose () {
    this.$emit('on-close')
  }

  onSubmit () {
    this.$emit('on-submit')
  }
}
</script>

<style scoped>

</style>
