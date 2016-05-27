
import React, { Component } from 'react'
import cx from 'classnames'

import { connect } from 'react-redux'
import { addTab, updateLocation, updateTitle, updateAddress, updateFavicon, exec, goBack, goForward } from 'actions/tabs'

import AddressBar from './AddressBar'
import Webview from './Webview'

if (process.env.BROWSER) {
  require('../styles/Content.scss')
}

@connect(
  state => ({
    current: state.tabs.current,
    tabs: state.tabs.tabs,
    address: state.tabs.currentAddress,
    shortcut: state.shortcuts.emitter,
  })
)
class Content extends Component {

  canGoBack = () => {
    const { tabs, current } = this.props

    return tabs[current].url < tabs[current].history.length - 1
  }

  canGoForward = () => {
    const { tabs, current } = this.props

    return tabs[current].url > 0
  }

  reload = () => {
    console.log('hey')
    this.refs.webview.reload()
  }

  back = () => {
    if (this.canGoBack()) {
      this.props.dispatch(goBack())
    }
  }

  forward = () => {
    if (this.canGoForward()) {
      this.props.dispatch(goForward())
    }
  }

  newWindow = e => {
  
    const { dispatch } = this.props
    const { ipcRenderer } = window.require('electron')

    return dispatch(addTab(e.url))
  }

  clickedLink = e => {
  
    const { dispatch } = this.props
    dispatch(updateLocation(e.url))
  }

  didFinishLoad = ({ title }) => {
  
    const { dispatch, index } = this.props
    dispatch(updateTitle(index, title))
  }

  onFaviconUpdate = e => {
  
    const { dispatch, index } = this.props
    dispatch(updateFavicon(index, e.favicons))
  }

  render () {

    const { src, current, tabs, shortcut, active, address, addressFocus, dispatch } = this.props

    return (
      <div className={cx('Content', { active })}>
        <div className='toolbar'>
          <div className='back-forward'>
            <i
              className={cx('ion-ios-arrow-back', { disabled: !this.canGoBack() })}
              onClick={this.back} />
            <i
              className={cx('ion-ios-arrow-forward', { disabled: !this.canGoForward() })}
              onClick={this.forward}/>
          </div>
          <i className='ion-refresh' onClick={this.reload} />
          <AddressBar
            address={address}
            addressFocus={addressFocus}
            active={active}
            src={src}
            current={current}
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
