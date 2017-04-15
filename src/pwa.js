import runtime from 'offline-plugin/runtime'
import miniToastr from 'mini-toastr'

miniToastr.init()

runtime.install({
  onUpdateReady() {
    console.log('update ready')
    runtime.applyUpdate()
  },

  onUpdated() {
    miniToastr.info('npmarket has been updated in the background, you can refresh the page to apply updates!', 'New version')
  }
})
