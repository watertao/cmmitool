<template>
    <div class="content">
      estate management
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// const electron = window.require('electron')

const breadcrumb = [
  { component: 'SystemSetting', breadcrumbName: '系统设置' }
]

@Component({
  components: {
  }
})
export default class SystemSetting extends Vue {
  mounted () {
    this.$store.commit('updateRouteBreadcrumb', breadcrumb)
  }
}
</script>

<style scoped>
.content {
  background: #FFF;
}
</style>
