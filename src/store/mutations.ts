import { MutationTree } from 'vuex'
import { RootState } from '@/store/types'

export const mutations: MutationTree<RootState> = {
  saveSession (state) {
    state.session.loginName = '7street'
  },

  updateRouteComponent (state, component) {
    state.route.component = component
  },

  updateRouteBreadcrumb (state, breadcrumb) {
    state.route.breadcrumb = breadcrumb
  }
}
