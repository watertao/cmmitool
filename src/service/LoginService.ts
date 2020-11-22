import infras from '@/common/infras'

class LoginService {
  /**
   * Check credential validation
   * @param password
   */
  async checkCredential (username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'watertao' && password === 'superman') {
          resolve()
        } else {
          reject(new Error('密码错误'))
        }
      }, 500)
    })
  }
}

const loginService = new LoginService()

export default loginService
