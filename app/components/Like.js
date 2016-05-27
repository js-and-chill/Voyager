
import React, { Component } from 'react'

if (process.env.BROWSER) {
  require('styles/Like.scss')
}

class Like extends Component {

  render () {

    const { likes = '1.7k', favorite = '2k' } = this.props
  
    return (
      <div className='Like'>
        <i className='ion-bookmark thumb' />
        <span>{likes}</span>
        <i className='ion-android-favorite heart' />
        <span>{favorite}</span>
      </div>
    )
  }
}

export default Like
