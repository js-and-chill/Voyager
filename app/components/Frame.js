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
    const { shortcut, dispatch } = this.props

    shortcut.on('remove:tab', () => dispatch(removeTab({ index: this.props.current })))
    shortcut.on('new:tab', () => {
      dispatch(addTab({ url: 'https://www.google.com', append: false }))
      dispatch(setCurrentTab({ current: this.props.tabs.length - 1 }))
    })
    shortcut.on('tab:left', () => {
      const { current, tabs } = this.props
      return dispatch(setCurrentTab({ current: !current ? tabs.length - 1 : current - 1 }))
    })
    shortcut.on('tab:right', () => {
      const { current, tabs } = this.props
      return dispatch(setCurrentTab({ current: current === tabs.length - 1 ? 0 : current + 1 }))
    })
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
