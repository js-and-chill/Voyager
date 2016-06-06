
import { createHandler } from 'logic/createHandler'

export default (name, permissions) => (Extension) => {

  const signature = {}

  const props = [
    'didNavigate',
    'willNavigate',
    'pageDidLoad',
    'addressIsUpdating'
  ].forEach(p => {

    if (Extension[p]) {
      signature[p] = (arg, utils) => Extension[p].call({ ...Extension, voyager: utils }, arg)
    }

  })

  return createHandler(permissions, { name, ...signature })
}

