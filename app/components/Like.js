
import React, { Component } from 'react'

if (process.env.BROWSER) {
  require('styles/Like.scss')
}

class Like extends Component {

  render () {
    const { likes = '1.7k', favorite = '2k' } = this.props

    return (
      <div className='Like'>
        <div className='bookmark-container'>
          <i className='ion-bookmark thumb' />
          <span>{likes}</span>
        </div>
        <div className='like-container'>
          <i className='ion-android-favorite heart' />
          <span>{favorite}</span>
        </div>
      </div>
    )
  }
}

export default Like
