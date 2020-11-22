import { MutationTree } from 'vuex'
import { RootState } from '@/store/types'

export const mutations: MutationTree<RootState> = {
  saveSession (state) {
    state.session.loginName = ''
  },

  updateRouteComponent (state, component) {
    state.route.component = component
  },

  updateRouteBreadcrumb (state, breadcrumb) {
    state.route.breadcrumb = breadcrumb
  }
}
