
import { createHandler } from './createHandler'

export const createExecFinder = (handlers, functions) => query => {

  const keys = Object.keys(handlers)

  for (const key of keys) {
    const handler = handlers[key](functions)

    if (handler(query)) { return }
  }

  throw new Error(`No handler has been found for query ${query}`)
}

export const createSuggestionsFinder = (handlers, functions) => query => {

  const results = Object.keys(handlers)
      .map(key => handlers[key](functions))
      .filter(handler => !!handler.suggest && typeof handler.suggest === 'function')
      .map(handler => handler.suggest(query))

  return Promise.all(results)
    .catch(e => console.log(e))
}
