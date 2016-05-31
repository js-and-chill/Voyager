
import React from 'react'

if (process.env.BROWSER) {
  require('styles/Like.scss')
}

export default ({ likes = '1.7k', favorite = '2k' }) => {
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
