export const createHandler = (permissions, description) => actions => {

  const functions = Object.keys(permissions).reduce((p, c) =>
    ({ ...p, [c]: actions[c] }), {})

  const trigger = prop => arg => {
    if (description[prop]) {
      return description[prop](arg, functions)
    }
  }

  return {
    permissions,
    name: description.name,

    willNavigate: trigger('willNavigate'),
    didNavigate: trigger('didNavigate'),
    addressIsUpdating: trigger('addressIsUpdating')
  }
}
