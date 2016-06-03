import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import {
  addTab,
  updateCurrentTabUrl,
  updateTabTitle,
  updateTabFavicon,
  historyGoBack,
  historyGoForward
} from 'actions/tabs'

import AddressBar from './AddressBar'
import Like from './Like'

import { setShortcut } from 'actions/shortcuts'

if (process.env.BROWSER) {
  require('styles/Frame.scss')
}

@connect(
  ({ shortcuts, tabs: { current, tabs } }) => ({
    canGoBack: tabs && tabs[current] && tabs[current].cursor < tabs[current].history.length - 1,
    canGoForward: tabs && tabs[current] && tabs[current].cursor > 0,
    shortcut: shortcuts.emitter,
    current,
    tabs
  })
)
class Frame extends Component {

  reload = () => {
    this.refs.webview.reload()
  }

  back = () => {
    if (this.props.canGoBack) {
      this.props.dispatch(historyGoBack())
    }
  }

  forward = () => {
    if (this.props.canGoForward) {
      this.props.dispatch(historyGoForward())
    }
  }

  render () {
    const { tabs, current } = this.props

    return (
      <div className='Frame'>
        <div className='toolbar'>
          <div className='icons'>
            <i
              className={cx('ion-ios-arrow-back back', { disabled: !this.props.canGoBack })}
              onClick={this.back} />
            <i
              className={cx('ion-ios-arrow-forward forward', { disabled: !this.props.canGoForward })}
              onClick={this.forward} />
            <i className='ion-refresh' onClick={this.reload} />
          </div>
          <AddressBar
            src={tabs[current].history[tabs[current].cursor]}
            current={current}
            index={current}
            tabs={tabs} />
          <Like />
        </div>
      </div>
    )
  }
}

export default Frame
