
import fs from 'fs'
import std from 'actions/std-functions'

const loadJSON = file => JSON.parse(fs.readFileSync(file, 'utf-8'))

class ExtensionVM {

  constructor (path, functions) {


    const { NodeVM } = require('vm2')

    try {
      this.package = loadJSON(`${path}/package.json`)
    } catch (e) {
      console.log(e)
      process.exit(0)
    }

    this.vm = new NodeVM(options)
    this.path = path
    this.fn = null

    const options = {
      console: 'inherit',
      sandbox: this.getSandBox(path, functions),
      require: true,
      timeout: 5000,
      requireExternal: true,
      requireNative: [],
      requireRoot: path
    }
  }

  getSandBox = (path, functions) => {
    const { permissions } = this.package

    return permissions.reduce((p, c) => {
      return { ...p, [c]: functions[c] }
    })
  }

  init () {
    const { main } = this.package
    const d = fs.readFileSync(`${this.path}/${main}`, 'utf8')
    this.fn = this.vm.run(d)
    return this
  }

  request (event, ...args) {
    return this.vm.call(this.fn[event], ...args)
  }
}

export default ExtensionVM
