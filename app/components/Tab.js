
import React, { Component } from 'react'
import cx from 'classnames'

if (process.env.BROWSER) {
  require('styles/Tab.scss')
}

class Tab extends Component {

  state = {
    mouseOver: false,
    loading: false
  }

  mouseOver = mouseOver => () => this.setState({ mouseOver })

  render () {
    const {
      onClick,
      onClose,
      onError,
      favicon,
      title,
      active
    } = this.props

    const { mouseOver } = this.state

    return (
      <div
        onMouseEnter={this.mouseOver(true)}
        onMouseLeave={this.mouseOver(false)}
        className={cx('Tab', { active })}>

        {favicon && <img
          src={favicon}
          onError={onError}
          width={15} />}

        <span
          onClick={onClick}
          className='title'>
          {title}
        </span>

        {mouseOver && <i className='ion-close-round' onClick={onClose} />}
      </div>
    )
  }
}

export default Tab
