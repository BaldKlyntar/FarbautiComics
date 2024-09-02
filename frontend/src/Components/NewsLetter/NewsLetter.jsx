import React from 'react'
import './NewsLetter.css'
import spidey_news from '../../assets/news_spidey.png'

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email!</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
          <input type="email" placeholder=' Your Email id' />
          <button>Subscribe</button>
          <img src={spidey_news} alt="" />
      </div>
  </div>
  )
}

export default NewsLetter