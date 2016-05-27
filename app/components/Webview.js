
import React, { Component } from 'react'

class Webview extends Component {

  static propTypes = {
    src: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onNewWindow: React.PropTypes.func,
    onClickedLink: React.PropTypes.func,
    onDidClickLink: React.PropTypes.func,
    onDidFinishLoad: React.PropTypes.func,
    onFaviconUpdate: React.PropTypes.func,
  }

  componentDidMount () {
  
    const {
      onNewWindow,
      onClickedLink,
      onDidClickLink,
      onDidFinishLoad,
      onFaviconUpdate,
    } = this.props

    const { webview } = this.refs

    this.reload = () => webview.reload()
    this.loaded = e => onDidFinishLoad && onDidFinishLoad({ e, title: webview.getTitle() })

    onNewWindow && webview.addEventListener('new-window', onNewWindow)
    onClickedLink && webview.addEventListener('will-navigate', onClickedLink)
    onDidClickLink && webview.addEventListener('did-navigate', onDidClickLink)
    onFaviconUpdate && webview.addEventListener('page-favicon-updated', onFaviconUpdate)
    onDidFinishLoad && webview.addEventListener('did-finish-load', this.loaded)
  }

  componentWillUnmount () {
  
    const {
      onNewWindow,
      onClickedLink,
      onDidClickLink,
      onFaviconUpdate,
    } = this.props

    const { webview } = this.refs

    onNewWindow && webview.removeEventListener('new-window', onNewWindow)
    onClickedLink && webview.removeEventListener('will-navigate', onClickedLink)
    onDidClickLink && webview.removeEventListener('did-navigate', onDidClickLink)
    onFaviconUpdate && webview.removeEventListener('page-favicon-updated', onFaviconUpdate)
    webview.removeEventListener('did-finish-load', this.loaded)
  }

  shouldComponentUpdate (nextP, nextS) {
    if (nextP.src === this.props.src) { return false }
    return true
  }

  render () {

    const {
      className,
      src,
    } = this.props

    return (
      <webview
        className={className}
        ref='webview'
        src={src}
        plugins
        allowpopups />
    )
  }
}

export default Webview
