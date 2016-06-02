
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
