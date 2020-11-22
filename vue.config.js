module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['electron-log'],
      builderOptions: {
        npmRebuild: false,
        extends: null,
        extraFiles: [
          'data',
          {
            from: 'dist_electron/package.json',
            to: 'package.json'
          },
        ],
      }
    }
  }
}

