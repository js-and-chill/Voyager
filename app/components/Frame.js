import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setShortcut } from 'actions/shortcuts'

import {
  removeTab,
  setCurrentTab,
  addTab,
  historyGoBack,
  historyGoForward
} from 'actions/tabs'

import Tabs from './Tabs'

if (process.env.BROWSER) {
  require('styles/Frame.scss')
}

@connect(
  ({ tabs }) => ({
    tabs: tabs.tabs,
    current: tabs.current
  })
)
class Frame extends Component {

  state = {
    mouseOver: null
  }

  componentDidMount () {
    const { dispatch, bindShortcut } = this.props

    const register = (name, action) =>
      dispatch(setShortcut({ name, action }))

    register('historyBack', () => {
      const { current, tabs } = this.props
      const currentTab = tabs && tabs[current]
      if (currentTab.history.length - 1 - currentTab.cursor) {
        dispatch(historyGoBack())
      }
    })

    register('historyForward', () => {
      const { current, tabs } = this.props
      const currentTab = tabs && tabs[current]
      if (currentTab.cursor) {
        dispatch(historyGoForward())
      }
    })

    register('removeTab', () => {
      dispatch(removeTab({ index: this.props.current }))
    })

    register('newTab', () => {
      dispatch(addTab({ url: 'https://www.google.com' }))
      dispatch(setCurrentTab({ current: this.props.tabs.length - 1 }))
    })

    register('tabLeft', () => {
      const { current, tabs } = this.props
      return dispatch(setCurrentTab({ current: !current ? tabs.length - 1 : current - 1 }))
    })

    register('tabRight', () => {
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
