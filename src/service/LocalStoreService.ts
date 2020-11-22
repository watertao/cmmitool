const ElectronStore = (window as any).require('electron-store')
const electron = (window as any).require('electron')

/**
 * {
 *   projects: [
 *     {
 *       id: 'REDKT395',
 *       name: '我的项目名',
 *       avatar: 'http://xxxxxx'
 *     }
 *   ]
 * }
 *
 */

const store = new ElectronStore()
function initLocalStorage () {
  if (!store.get('projects')) {
    store.set('projects', [])
  }
}

console.log(`initialize local storage file: ${electron.remote.app.getPath('userData')}`)
initLocalStorage()

class LocalStoreService {
  async get (key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const val = store.get(key)
        resolve(val)
      } catch (error) {
        reject(error)
      }
    })
  }

  async set (key: string, val: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        store.set(key, val)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  async delete (key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        store.delete(key)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

const localStoreService = new LocalStoreService()

export default localStoreService
