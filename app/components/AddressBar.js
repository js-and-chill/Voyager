import React, { Component } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import { exec } from 'actions/tabs'

import { emptySuggestions, suggest } from 'actions/autocomplete'

import {
  addressIsUpdating,
  willNavigate,
  didNavigate,
} from 'actions/lifecycle'

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

  submit = value => {
    const { dispatch } = this.props
    dispatch(emptySuggestions())
    return dispatch(willNavigate(value))
  }

  onChange = value => {
    if (value.trim() === '' || value.length < 3) {
      return this.props.dispatch(emptySuggestions())
    }

    this.props.dispatch(addressIsUpdating(value))
  }

  render () {
    const { suggestions, src, index } = this.props

    return (
      <div className='AddressBar'>
          <Address
            active={this.props.active}
            onSubmit={this.submit}
            inactiveValue={src}
            inputClassName='Input'
            suggestionsClassName='Suggestions'
            suggestions={suggestions}
            index={index}
            onChange={this.onChange} />
      </div>
    )
  }
}

export default AddressBar
