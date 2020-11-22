import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootState } from '@/store/types'
import { actions } from './actions'
import { mutations } from './mutations'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    session: { loginName: '' },
    project: null,
    route: { component: 'BatchManagement', breadcrumb: { component: 'BatchManagement', breadcrumbName: '批次管理' } }
  },
  actions,
  mutations,
  modules: {
  }
}

export default new Vuex.Store<RootState>(store)
