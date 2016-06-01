import React, { Component } from 'react'
import { connect } from 'react-redux'

import { register } from 'actions/shortcuts'

import Content from 'components/Content'
import Frame from 'components/Frame'

if (process.env.BROWSER) {
  require('styles/Browser.scss')
}

@connect(
  state => ({
    current: state.tabs.current,
    tabs: state.tabs.tabs
  })
)
class Browser extends Component {

  componentDidMount () {

    const listen = (key, event) => this.props.dispatch(register(key, event))

    listen('CmdOrCtrl+L', 'inputFocus')
  }

  render () {
    const { current, tabs } = this.props

    return (
      <div className='Browser'>
        <Frame />
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
