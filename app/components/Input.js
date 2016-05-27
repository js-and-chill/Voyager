
import React, { Component } from 'react'
import Mousetrap from 'mousetrap'

if (process.env.BROWSER) {
  require('styles/Input.scss')
}

class Input extends Component {

  state = {
    left: null,
    focus: false,
  }

  addComplete = e => {
    const { complete, completeDidMatch = v => v, onEmpty } = this.props
    const input = e.target
    const { value } = input

    if (value === this.props.value) { return this.setState({ left: null }) }

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

    const { onChange, complete, completeDidntMatch = v => 0 } = this.props
    const { value } = e.target

    onChange(value)

    if (complete && value && value.length && !complete.indexOf(value)) {
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

  render () {

    const { onKeyDown, value, className = '', onFocus, onBlur } = this.props
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
