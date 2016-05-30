const { initialState } = require('../../../app/reducers/tabs')

describe('#tabs reducer', () => {
  const state = { ...initialState }

  it('initialState must be ok', () => {
    expect(state)
      .to.be.an('object')
      .and.to.have.all.keys(['current', 'tabs', 'history'])

    expect(state.current)
      .to.be.a('number')
      .and.to.equal(0)
  })

  it('tabs has to be valid', () => {
    expect(state.tabs)
      .to.be.an('array')
      .and.to.have.length(2)

    state.tabs.forEach(tab =>
      expect(tab).to.be.an('object')
        .to.have.all.keys(['id', 'title', 'cursor', 'history'])
    )
  })

  it('history must have two element', () => {
    expect(state.history)
      .to.be.an('array')
      .and.to.have.length(2)

    state.history.forEach(elem => expect(elem).to.be.a('string'))
    expect(state.history[0]).to.equal(state.tabs[0].id)
    expect(state.history[1]).to.equal(state.tabs[1].id)
  })
})
