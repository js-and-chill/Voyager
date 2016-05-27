
import React, { Component } from 'react'
import cx from 'classnames'

if (process.env.BROWSER) {
  require('styles/Suggestions.scss')
}

class Suggestions extends Component {

  handleClick = index => e => {
    const { onClick } = this.props
    onClick(index)
  }

  mouseEnter = (group, index) => e => {
    const { onActiveChange } = this.props
    onActiveChange([ group, index ])
  }

  renderListItem = group => (item, index) => {

    const { active } = this.props

    return (
      <div
        onClick={this.handleClick(index)}
        onMouseEnter={this.mouseEnter(group, index)}
        key={index}
        className={cx('item', { active: group === active[0] && active[1] === index })}>
        <span>{item}</span>
      </div>
    )
  }

  renderGroup = (group, index) => {

    const { active } = this.props

    return (
      <div
        className='group'
        key={index}>
        <div className='group-title'>
          {group.icon && <img src={group.icon} width={15} />}
          <span>{group.name}</span>
        </div>
        {group.list && group.list.map(this.renderListItem(index))}
      </div>
    )
  }

  render () {
  
    const { groups, className = '' } = this.props

    return (
      <div className={`Suggestions ${className}`}>
        {groups.map(this.renderGroup)}
      </div>
    )
  }
}

export default Suggestions
