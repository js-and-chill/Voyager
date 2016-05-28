import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addTab, removeCurrent, goLeft, goRight } from 'actions/tabs'

import Tabs from './Tabs'

if (process.env.BROWSER) {
  require('styles/Frame.scss')
}

@connect(
  state => ({
    tabs: state.tabs.tabs,
    current: state.tabs.current,
    shortcut: state.shortcuts.emitter
  })
)
class Frame extends Component {

  state = {
    mouseOver: null
  }

  componentDidMount () {
    const { shortcut, dispatch } = this.props

    shortcut.on('remove:tab', () => dispatch(removeCurrent()))
    shortcut.on('tab:left', () => dispatch(goLeft()))
    shortcut.on('tab:right', () => dispatch(goRight()))
    shortcut.on('new:tab', () => dispatch(addTab('https://www.google.com')))
  }

  render () {
    const { tabs, current } = this.props

    return (
      <div className='Frame'>
        <Tabs tabs={tabs} active={current} />
      </div>
    )
  }
}

export default Frame
