import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mouseTrap } from 'react-mousetrap'

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

    bindShortcut('command+left', () => {
      const { current, tabs } = this.props
      const currentTab = tabs && tabs[current]
      if (currentTab.history.length - 1 - currentTab.cursor) {
        dispatch(historyGoBack())
      }
    })

    bindShortcut('command+right', () => {
      const { current, tabs } = this.props
      const currentTab = tabs && tabs[current]
      if (currentTab.cursor) {
        dispatch(historyGoForward())
      }
    })

    bindShortcut('command+w', e => {
      e.preventDefault()
      e.stopImmediatePropagation()
      dispatch(removeTab({ index: this.props.current }))
    })

    bindShortcut('command+t', () => {
      dispatch(addTab({ url: 'https://www.google.com' }))
      dispatch(setCurrentTab({ current: this.props.tabs.length - 1 }))
    })

    bindShortcut('command+alt+left', () => {
      const { current, tabs } = this.props
      return dispatch(setCurrentTab({ current: !current ? tabs.length - 1 : current - 1 }))
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

export default mouseTrap(Frame)
