
import React, { Component } from 'react'
import { connect } from 'react-redux'

if (process.env.BROWSER) {
  require('styles/Input.scss')
}

@connect(
  state => ({
    shortcut: state.shortcuts.emitter,
    current: state.tabs.current
  })
)
class Input extends Component {

  state = {
    left: null,
    focus: false
  }

  addComplete = e => {
    const { complete, completeDidMatch = v => v } = this.props
    const input = e.target
    const { value } = input

    if (value <= this.props.value) { return this.setState({ left: null }) }

    if (complete === value) {
      this.setState({ left: null })
      return completeDidMatch()
    }

    const left = complete.substr(value.length, complete.length)

    this.setState({ left })

    setTimeout(() => {
      input.focus()
      input.setSelectionRange(value.length, complete.length)
    }, 0)
  }

  /*
   * TODO: escape regexes
   */
  handleCaret = e => {
    const { onChange, complete } = this.props
    const { value } = e.target

    onChange(value)

    if (complete &&
        value &&
        value.length &&
        value.length > this.props.value.length &&
        !complete.indexOf(value)) {
      this.addComplete(e)
    } else {
      this.setState({ shouldComplete: false, left: null })
    }
  }

  onKeyDown = e => {
    const { onKeyDown } = this.props

    if (e.key === 'ArrowUp') {
      this.setState({ left: null })
      e.preventDefault()
    }
    if (e.key === 'ArrowDown') {
      this.setState({ left: null })
      e.preventDefault()
    }

    onKeyDown(e)
  }

  handleClick = e => {
    if (!this.state.focus) {
      e.target.select()
    }
    this.setState({ focus: true })
  }

  onBlur = e => {
    const { onBlur } = this.props
    this.setState({ focus: false })
    onBlur(e)
  }

  componentDidMount () {
    const { shortcut } = this.props
    const { input } = this.refs

    input.focus()
    input.select()

    shortcut.on('address:focus', () => {
      if (this.props.index === this.props.current) {
        input.focus()
        input.select()
      }
    })
  }

  render () {
    const { value, className = '' } = this.props
    const { left } = this.state

    return (
      <input
        className={`Input ${className}`}
        ref='input'
        onClick={this.handleClick}
        type='search'
        value={value + (left || '')}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        onChange={this.handleCaret} />
    )
  }
}

export default Input
