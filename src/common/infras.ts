// check whether running in development mode
// depends on 'additionalArguments' in 'background.ts'
let isDEV = false
window.process.argv.forEach(i => {
  if (i === 'DEV') {
    isDEV = true
  }
})

// retrieve working dir and other paths
const path = (window as any).require('path')
const electron = (window as any).require('electron')
const workingDir = isDEV ? '.' : path.join(electron.remote.app.getAppPath(), '..', '..')
const pathInst = {
  workingDir,
  package: path.join(workingDir, 'package.json')
}

// initialize logger
const logger = (window as any).require('electron-log')

const INFRASTRUCTURE: Infras = {
  logger,
  path: pathInst
}

export interface Infras {
  path: Path;
  logger: any;
}

export interface Path {
  workingDir: string
  package: string
}

export default INFRASTRUCTURE
