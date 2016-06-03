
import React from 'react'

if (process.env.BROWSER) {
  require('styles/Like.scss')
}

export default ({ likes = '1.7k', favorite = '2k', comments = '1k' }) => {
  return (
    <div className='Like'>
      <div className='bookmark-container'>
        <i className='ion-ios-star thumb' />
      </div>
      <div className='like-container'>
        <i className='ion-android-favorite heart' />
      </div>
      <div className='like-container'>
        <i className='ion-chatbubble bubble' />
      </div>
    </div>
  )
}
