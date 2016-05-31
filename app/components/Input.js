
import React, { Component } from 'react'
import { mouseTrap } from 'react-mousetrap'

if (process.env.BROWSER) {
  require('styles/Input.scss')
}

class Input extends Component {

  state = {
    inputLength: 0,
    focus: false
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

    this.props.onKeyDown(e)
  }

  shouldComponentUpdate (props, state) {
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
    const { input } = this.refs
    input.value = value
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
    const { displayValue, active, bindShortcut } = this.props

    if (active) {
      bindShortcut('command+l', () => this.select())
    }

    input.value = displayValue
    input.focus()
    input.select()
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

export default mouseTrap(Input)
