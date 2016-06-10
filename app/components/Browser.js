import React, { Component } from 'react'
import { connect } from 'react-redux'

import { register } from 'actions/shortcuts'
//import { setup } from 'actions/extensions'

import Content from 'components/Content'
import Frame from 'components/Frame'
import Tabs from 'components/Tabs'

if (process.env.BROWSER) {
  require('styles/Browser.scss')
}

@connect(
  state => ({
    current: state.tabs.current,
    extensions: state.extensions,
    tabs: state.tabs.tabs
  })
)
class Browser extends Component {

  componentDidMount () {

    const { extensions, dispatch } = this.props

    /*
    if (!extensions.length) {
      return dispatch(setup())
    }
   */

    const listen = (key, event) => this.props.dispatch(register(key, event))

    listen('CmdOrCtrl+L', 'inputFocus')
    listen('CmdOrCtrl+T', 'newTab')
    listen('CmdOrCtrl+W', 'removeTab')
    listen('CmdOrCtrl+Alt+Left', 'tabLeft')
    listen('CmdOrCtrl+Alt+Right', 'tabRight')
  }

  splash = () => {
   return (
    <h1>Hello Splash</h1>
   )
  }

  render () {
    const { current, tabs, extensions } = this.props

    /*
    if (!extensions.length) {
      return this.splash()
    }
   */

    return (
      <div className='Browser'>
        <Frame />
        <Tabs tabs={tabs} active={current} />
        <div className='web-wrapper'>
          {tabs.map((tab, index) => {
            return (
              <Content
                src={tab.history[tab.cursor]}
                active={current === index}
                index={index}
                key={tab.id} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Browser
