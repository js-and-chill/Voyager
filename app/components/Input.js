
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setShortcut } from 'actions/shortcuts'

if (process.env.BROWSER) {
  require('styles/Input.scss')
}

@connect()
class Input extends Component {

  state = {
    inputLength: 0,
    focus: false
  }

  constructor (props) {
    super(props)

    this.setValue = this.setValue.bind(this)
  }

  insertComplete = () => {
    const { complete } = this.props
    const { input } = this.refs
    const { value } = input
    const { inputLength } = this.state
    const selectionStart = value.length
    const selectionEnd = complete && complete.length || null
    const left = complete && complete.replace(value, '') || ''

    this.props.onChange(value)

    this.setState({ inputLength: value.length })
    this.props.onChange(value)

    if (inputLength >= value.length ||
        typeof complete !== 'string' ||
        complete.indexOf(value) !== 0) { return }

    input.value = value + left

    input.setSelectionRange(selectionStart, selectionEnd)
  }

  onKeyDown = e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
    }

    this.props.onKeyDown(e, this.setValue.bind(this), this.blur.bind(this))
  }

  shouldComponentUpdate (props, state) {

    if (props.displayValue !== this.props.displayValue) {
      this.refs.input.value = props.displayValue
      return true
    }

    if (props.complete !== this.props.complete) { return true }
    return false
  }

  blur () {
    this.refs.input.blur()
  }

  select () {
    const { input } = this.refs

    input.focus()
    input.select()
  }

  setValue (value) {
    this.refs.input.value = value
  }

  onBlur = e => {
    /*
     * Or maybe not
     */
    const { displayValue } = this.props

    this.setState({ focus: false })
    e.target.value = displayValue
    this.props.onBlur(e)
  }

  onClick = e => {
    if (!this.state.focus) {
      e.target.select()
    }
    this.setState({ focus: true })
  }

  componentDidMount () {
    const { input } = this.refs
    const { displayValue, active } = this.props

    input.value = displayValue
    input.focus()
    input.select()

    this.props.dispatch(setShortcut({
      name: 'inputFocus',
      action: this.select.bind(this),
    }))
  }

  render () {
    const { className } = this.props

    return (
      <input
        className={`Input ${className}`}
        ref='input'
        type='text'
        onBlur={this.onBlur}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        onChange={this.insertComplete}
        />
    )
  }
}

export default Input
