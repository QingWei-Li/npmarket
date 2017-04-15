import runtime from 'offline-plugin/runtime'

runtime.install({
  onUpdateReady() {
    console.log('update ready')
    runtime.applyUpdate()
  },

  onUpdated() {
    console.log('CodePan has been updated in the background, you can refresh the page to apply updates!')
  }
})
