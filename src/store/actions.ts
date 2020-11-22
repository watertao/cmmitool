import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import loginService from '@/service/LoginService'

export const actions: ActionTree<RootState, RootState> = {
  /**
   * login
   * @param commit
   */
  login ({ commit }, { username, password }): Promise<any> {
    return loginService.checkCredential(username, password)
      .then(() => {
        commit('saveSession')
      })
  }
}
