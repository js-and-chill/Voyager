
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { removeTab, setCurrent, addTab, updateFavicon } from 'actions/tabs'

import Tab from './Tab'

if (process.env.BROWSER) {
  require('styles/Tabs.scss')
}

@connect()
class Tabs extends Component {

  selectTab = index => () => {
    this.props.dispatch(setCurrent(index))
  }

  close = index => () => {
    this.props.dispatch(removeTab(index))
  }

  addTab = () => {
    this.props.dispatch(addTab('https://www.google.com'))
  }

  updateFavicon = index => () => {
    this.props.dispatch(updateFavicon(index, [ 'https://cdn2.iconfinder.com/data/icons/ourea-icons/128/File_-_Default_256x256-32.png' ]))
  }

  render () {

    const { tabs, active } = this.props

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
