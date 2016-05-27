
import React, { Component } from 'react'
import { debounce } from 'lodash'

import Input from './Input'
import Suggestions from './Suggestions'

if (process.env.BROWSER) {
  require('styles/Address.scss')
}

class Address extends Component {

  state = {
    active: [ 0, 0 ],
    inputValue: '',
    empty: true,
  }

  handleKey = e => {
    const [ activeGroup, activeItem ] = this.state.active
    const { suggestions, onSubmit } = this.props

    if (e.key === 'ArrowUp') {

      const { value } = e.target
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
        inputValue: suggestions[nextActiveGroup].list[nextActiveItem],
        active: [ nextActiveGroup, nextActiveItem ]
      })
    }

    if (e.key === 'ArrowDown') {

      const { value } = e.target
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
        inputValue: suggestions[nextActiveGroup].list[nextActiveItem],
        active: [ nextActiveGroup, nextActiveItem ]
      })
    }

    if (e.key === 'Enter') {
      const { value } = e.target
      onSubmit(value)
    }
  }

  onInputChange = value => {

    const { onChange } = this.props

    if (!value) { return this.setState({ empty: true, inputValue: value }) }

    this.setState({
      empty: false,
      inputValue: value,
    })

    onChange(value)
  }

  setInactive = () => {
    const { inactiveValue } = this.props
    this.setState({ inputValue: inactiveValue, empty: true, active: [ 0, 0 ] })
  }

  handleSuggestionsClick = index => {
    const { onSubmit, suggestions } = this.props
    onSubmit(suggestions[active])
  }

  componentWillMount () {
    this.setInactive()
  }

  render () {

    const { active, empty, inputValue } = this.state
    const { inputClassName, suggestionsClassName, suggestions, inactiveValue } = this.props

    return (
      <div className='Address'>
        <Input
          className={inputClassName}
          onBlur={this.setInactive}
          completeDidMatch={() => this.setState({ active: [ 0, 0 ] })}
          value={inputValue}
          complete={suggestions.length && suggestions[0].list[0]}
          onKeyDown={this.handleKey}
          onChange={this.onInputChange} />
          {!empty && <Suggestions
            className={suggestionsClassName}
            onActiveChange={active => this.setState({ active })}
            active={active}
            onClick={this.handleSuggestionsClick}
            groups={suggestions}/>}
      </div>
    )
  }
}

export default Address
