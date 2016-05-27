
import React, { Component } from 'react'
import cx from 'classnames'

if (process.env.BROWSER) {
  require('styles/Tab.scss')
}

class Tab extends Component {

  state = {
    mouseOver: false,
    loading: false,
  }

  render () {

    const {
      onClick,
      onClose,
      onError,
      favicon,
      title,
      active,
    } = this.props

    const { mouseOver } = this.state

    return (
      <div
        onMouseEnter={() => this.setState({ mouseOver: true })}
        onMouseLeave={() => this.setState({ mouseOver: false })}
        className={cx('Tab new-tab', { active })}>

        {favicon && <img
           src={favicon}
           onError={onError}
           width={15} />}

        <span
          onClick={onClick}
          className='title'>
          {title}
        </span>

        {mouseOver &&
          <i className='ion-close-round' onClick={onClose}/>}
      </div>
    )
  }
}

export default Tab
