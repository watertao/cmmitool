import '@/common/exception-handler'
import infras from '@/common/infras'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const { logger } = infras
logger.info('Application startup.')

Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
