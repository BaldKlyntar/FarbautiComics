import React from 'react'
import './HomeBanner.css'
import batman_principal from '../../assets/Batman_Principal.png'
import arrow_icon from '../../assets/arrow.png'
import { Link } from 'react-router-dom'

const HomeBanner = () => {
  return (
    <div className="homebanner">
      <div className="homebanner-left">
          <img src={batman_principal} alt="" />
      </div>
      <div className="homebanner-right">
          <h1>Dont miss the adventures of The Caped Crusader!</h1>
          <Link style={{textDecoration:'none', color: 'white', fontFamily: 'Oswald'}} to='/category/dc'>
              <button className="hero-btn">
                  <div>DC Comics</div>
                  <img src={arrow_icon} alt="" />
              </button>
          </Link>
      </div>
  </div>
  )
}

export default HomeBanner