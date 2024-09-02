import React from 'react'
import './Animanga.css'
import lain_banner from '../../../assets/lain_banner.png'
import animanga_logo from '../../../assets/animanga_logo.png'


export const Animanga = () => {
  return (
    <div className="animanga-banner">
        <div className="animanga-banner-adv">
            <h1>Animanga Collection</h1>
            <p>Explore our vast selection of classic and modern comic books.</p>
        </div>
        <div className="animanga-banner-img">
            <img src={lain_banner} alt="" />
        </div>
        <div className="animanga-banner-logo">
            <img src={animanga_logo} alt="" />
        </div>
    </div>
  )
}

