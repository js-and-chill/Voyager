import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  removeTab,
  setCurrentTab,
  addTab
} from 'actions/tabs'

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
    const { shortcut, dispatch, current, tabs } = this.props

    shortcut.on('remove:tab', () => dispatch(removeTab({ current })))
    shortcut.on('tab:left', () => dispatch(setCurrentTab(!current ? tabs.length - 1 : current - 1)))
    shortcut.on('tab:right', () => dispatch(setCurrentTab(current === tabs.length - 1 ? 0 : current + 1)))
    shortcut.on('new:tab', () => dispatch(addTab({ url: 'https://www.google.com', append: false })))
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
