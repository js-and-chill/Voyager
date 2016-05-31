import React, { Component } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import { exec } from 'actions/tabs'

import { emptySuggestions, suggest } from 'actions/autocomplete'

import Like from './Like'
import Address from './Address'

if (process.env.BROWSER) {
  require('styles/AddressBar.scss')
}

@connect(
  state => ({
    suggestions: state.autocomplete.groups.filter(g => !!g.list.length),
    tabs: state.tabs.tabs,
    current: state.tabs.current,
    shortcut: state.shortcuts.emitter
  })
)
class AddressBar extends Component {

  updateSuggestions = debounce(value => {
    this.props.dispatch(suggest(value))
  }, 600)

  onChange = e => {
    const { value } = e.target
    const { dispatch } = this.props

    // dispatch(updateAddress(value))

    if (value) {
      return this.updateSuggestions(value)
    }

    dispatch(emptySuggestions())
  }

  submit = value => {
    const { dispatch } = this.props
    return dispatch(exec(value))
  }

  evalSuggestion = value => this.props.dispatch(suggest(value))

  render () {
    const { suggestions, src, index } = this.props

    return (
      <div className='AddressBar'>
        <Like />
        <div className='input-content'>
          <Address
            active={this.props.active}
            onSubmit={this.submit}
            inactiveValue={src}
            inputClassName='Input'
            suggestionsClassName='Suggestions'
            suggestions={suggestions}
            index={index}
            onChange={this.evalSuggestion} />
        </div>
      </div>
    )
  }
}

export default AddressBar
