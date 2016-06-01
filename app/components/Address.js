
import React, { Component } from 'react'
import Input from './Input'
import Suggestions from './Suggestions'

if (process.env.BROWSER) {
  require('styles/Address.scss')
}

class Address extends Component {

  state = {
    active: [ 0, 0 ],
    empty: true
  }

  handleKey = (e, setValue, blur) => {
    const [ activeGroup, activeItem ] = this.state.active
    const { suggestions, onSubmit } = this.props

    if (e.key === 'ArrowUp') {
      let nextActiveGroup, nextActiveItem

      if (activeItem === 0) {
        nextActiveGroup = activeGroup === 0
          ? suggestions.length - 1
          : activeGroup - 1

        const { list } = suggestions[nextActiveGroup]
        nextActiveItem = list.length - 1
      } else {
        nextActiveGroup = activeGroup
        nextActiveItem = activeItem - 1
      }

      this.setState({
        active: [ nextActiveGroup, nextActiveItem ]
      })

      setValue(suggestions[nextActiveGroup].list[nextActiveItem])
    }

    if (e.key === 'ArrowDown') {
      let nextActiveGroup, nextActiveItem

      if (activeItem === suggestions[activeGroup].list.length - 1) {
        nextActiveGroup = activeGroup === suggestions.length - 1
          ? 0
          : activeGroup + 1

        nextActiveItem = 0
      } else {
        nextActiveGroup = activeGroup
        nextActiveItem = activeItem + 1
      }

      this.setState({
        active: [ nextActiveGroup, nextActiveItem ]
      })

      setValue(suggestions[nextActiveGroup].list[nextActiveItem])
    }

    if (e.key === 'Enter') {
      this.setState({ empty: true })
      const { value } = e.target
      onSubmit(value)
      blur()
    }
  }

  onInputChange = value => {
    const { onChange } = this.props

    if (!value) { return this.setState({ empty: true }) }

    this.setState({ empty: false })

    onChange(value)
  }

  setInactive = () => {
    this.setState({ active: [ 0, 0 ], empty: true })
  }

  handleSuggestionsClick = index => {
    const { onSubmit, suggestions } = this.props
    onSubmit(suggestions[index])
  }

  componentWillMount () {
    this.setInactive()
  }

  activeSuggestion = active => this.setState({ active })

  deactiveSuggestion = () => this.setState({ active: [ 0, 0 ] })

  render () {
    const { active, empty } = this.state
    const { index, inputClassName, suggestionsClassName, suggestions, inactiveValue } = this.props

    return (
      <div className='Address'>
        <Input
          active={this.props.active}
          className={inputClassName}
          index={index}
          ref='input'
          onBlur={this.setInactive}
          completeDidMatch={this.deactiveSuggestion}
          value={inactiveValue}
          displayValue={inactiveValue}
          complete={suggestions.length ? suggestions[0].list[0] : null}
          onKeyDown={this.handleKey}
          onChange={this.onInputChange} />

          {!empty && <Suggestions
            className={suggestionsClassName}
            onActiveChange={this.activeSuggestion}
            active={active}
            onClick={this.handleSuggestionsClick}
            groups={suggestions} />}
      </div>
    )
  }
}

export default Address
