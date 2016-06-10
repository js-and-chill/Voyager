
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  removeTab,
  setCurrentTab,
  addTab,
  updateTabFavicon
} from 'actions/tabs'
import { setShortcut } from 'actions/shortcuts'

import Tab from './Tab'

if (process.env.BROWSER) {
  require('styles/Tabs.scss')
}

@connect(
  ({ tabs: { current }, shortcuts: { inputFocus } }) => ({
    current,
    inputFocus
  })
)
class Tabs extends Component {

  selectTab = index => () => {
    this.props.dispatch(setCurrentTab({ current: index }))
  }

  close = index => () => {
    this.props.dispatch(removeTab({ index }))
  }

  addTab = () => {
    const { dispatch, tabs } = this.props
    dispatch(addTab({ url: 'https://www.google.com' }))
    this.selectTab(tabs.length)()
  }

  updateFavicon = index => () => {
    this.props.dispatch(updateTabFavicon({
      index,
      favicon: 'https://cdn2.iconfinder.com/data/icons/ourea-icons/128/File_-_Default_256x256-32.png'
    }))
  }

  componentDidMount () {

    const { dispatch } = this.props
  
    dispatch(setShortcut({
      name: 'newTab',
      action: () => {
        this.addTab()
        this.props.inputFocus()
      }
    }))

    dispatch(setShortcut({
      name: 'removeTab',
      action: () => {
        this.close(this.props.current)()
      }
    }))

    dispatch(setShortcut({
      name: 'tabRight',
      action: () => {
        const { current, tabs } = this.props

        this.props.dispatch(setCurrentTab({
          current: current === tabs.length - 1 ? 0 : current + 1
        }))
      }
    }))

    dispatch(setShortcut({
      name: 'tabLeft',
      action: () => {
        const { current, tabs } = this.props

        this.props.dispatch(setCurrentTab({
          current: current === 0 ? tabs.length - 1 : current - 1
        }))
      }
    }))
  }

  render () {
    const { tabs, active, current } = this.props

    return (
      <div className='Tabs'>
        <div className='list'>
          {tabs.map((tab, index) => {
            return (
              <Tab
                key={index}
                active={index === active}
                onClick={this.selectTab(index)}
                onClose={this.close(index)}
                favicon={tab.favicon}
                onError={this.updateFavicon(index)}
                title={tab.title} />
            )
          })}
          <div className='plus' onClick={this.addTab}>
            <i className='ion-plus' />
          </div>
        </div>
      </div>
    )
  }
}

export default Tabs
