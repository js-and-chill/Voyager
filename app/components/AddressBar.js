
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { debounce } from 'lodash'

import { updateAddress, exec} from 'actions/tabs'
import { emptySuggestions, suggest } from 'actions/autocomplete'

import Input from './Input'
import Like from './Like'
import Autocomplete from './Autocomplete'
import Address from './Address'

if (process.env.BROWSER) {
  require('styles/AddressBar.scss')
}

@connect(
  state => ({
    suggestions: state.autocomplete.groups,
    tabs: state.tabs.tabs,
    current: state.tabs.current,
    shortcut: state.shortcuts.emitter,
  })
)
class AddressBar extends Component {

  updateSuggestions = debounce(value => {
    this.props.dispatch(suggest(value))
  }, 600)

  onChange = e => {
    const { value } = e.target
    const { dispatch } = this.props

    dispatch(updateAddress(value))

    if (value) {
      return this.updateSuggestions(value)
    }

    dispatch(emptySuggestions())
  }

  submit = value => {
    const { dispatch } = this.props
    return dispatch(exec(value))
  }

  render () {

    const { address, dispatch, suggestions, current, tabs, src } = this.props

    return (
      <div className='AddressBar'>
        <Like />
        <div className='input-content'>
          <Address
            onSubmit={this.submit}
            inactiveValue={src}
            inputClassName='Input'
            suggestionsClassName='Suggestions'
            suggestions={suggestions}
            onChange={value => dispatch(suggest(value))}/>
        </div>
      </div>
    )
  }
}

export default AddressBar
