
import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import {
  addTab,
  updateCurrentTabUrl,
  updateTabTitle,
  updateTabFavicon,
  historyGoBack,
  historyGoForward
} from 'actions/tabs'

import AddressBar from './AddressBar'
import Webview from './Webview'

if (process.env.BROWSER) {
  require('../styles/Content.scss')
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
class Content extends Component {

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

  newWindow = e => {
    const { dispatch } = this.props
    return dispatch(addTab({ url: e.url, append: true }))
  }

  clickedLink = e => {
    const { dispatch } = this.props
    dispatch(updateCurrentTabUrl({ url: e.url }))
  }

  didFinishLoad = ({ title }) => {
    const { dispatch, index } = this.props
    dispatch(updateTabTitle({ index, title }))
  }

  onFaviconUpdate = e => {
    const { dispatch, index } = this.props
    dispatch(updateTabFavicon({ index, favicon: e.favicons[e.favicons.length - 1] }))
  }

  render () {
    const { src, index, current, tabs, shortcut, active, address, addressFocus } = this.props

    return (
      <div className={cx('Content', { active })}>
        <div className='toolbar'>
          <div className='back-forward'>
            <i
              className={cx('ion-ios-arrow-back', { disabled: !this.props.canGoBack })}
              onClick={this.back} />
            <i
              className={cx('ion-ios-arrow-forward', { disabled: !this.props.canGoForward })}
              onClick={this.forward} />
          </div>
          <i className='ion-refresh' onClick={this.reload} />
          <AddressBar
            address={address}
            addressFocus={addressFocus}
            active={active}
            src={src}
            current={current}
            index={index}
            tabs={tabs}
            shortcut={shortcut} />
        </div>
        <Webview
          className='webview-element'
          ref='webview'
          src={src}
          onNewWindow={this.newWindow}
          onClickedLink={this.clickedLink}
          onDidFinishLoad={this.didFinishLoad}
          onFaviconUpdate={this.onFaviconUpdate} />
      </div>
    )
  }
}

export default Content
