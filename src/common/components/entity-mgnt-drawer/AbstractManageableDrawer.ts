import { Prop, Watch, Vue, Component } from 'vue-property-decorator'
import { FormModel } from 'ant-design-vue'

/**
 * An abstract class for make component of manageable drawer.
 *
 * Events:
 * @on-close when click mask, or cancel button, this event will be emitted
 *
 * Props:
 * @visible visible or not of drawer
 * @identity id of entity in drawer
 *
 */
@Component
export default class AbstractManageableDrawer<T> extends Vue {
  @Prop() visible = false
  @Prop() identity?: string

  entity = this.resetEntity()
  form: any

  get isCreate (): boolean {
    return !this.identity
  }

  @Watch('visible')
  onChangeValue (visible: boolean) {
    if (visible) {
      if (!this.isCreate) {
        this.$nextTick(() => {
          this.loadEntityAsync().then((entity: T) => {
            this.entity = entity
          })
        })
      } else {
        this.entity = this.resetEntity()
      }
    }
  }

  onSubmit () {
    (this.$refs.form as FormModel).validate((valid: boolean) => {
      if (valid) {
        this.doSubmit().then(() => {
          this.$message.success('保存成功')
          this.$emit('on-close')
          this.$emit('on-saved')
        }).catch(err => {
          this.$message.warn(err.message)
        })
      } else {
        console.warn('not valid form value')
      }
    })
  }

  afterVisibleChange (visible: any) {
    if (visible) {
      // initialize form
    } else {
      // clear form
    }
    // this.$emit('on-visible-change', visible)
  }

  onClose () {
    (this.$refs.form as FormModel).clearValidate([])
    this.$emit('on-close')
  }

  beforeCreate () {
    this.form = this.$form.createForm(this, {})
  }

  protected doSubmit (): Promise<void> {
    throw new Error('not implemented')
  }

  protected loadEntityAsync (): Promise<T> {
    throw new Error('not implemented')
  }

  protected resetEntity (): T {
    throw new Error('not implemented')
  }
}
