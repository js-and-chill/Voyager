
export const createHandler = (permissions, description) => actions => {

  const functions = Object.keys(permissions).reduce((p, c) =>
    ({ ...p, [c]: actions[c] }), {})

  return Object.assign(
    query => description.exec(query, functions),
    {
      suggest: description.suggest
        ? query => description.suggest(query, functions)
        : null,
      description,
      permissions,
    }
  )
}
