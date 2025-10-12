import React, {useState, useEffect, useContext} from 'react'
import './Trending.css'
//import trending from '../../assets/trending'
import Item from '../Item/Item'
import customFetch from '../../Utils/customFetch'
import { ShopContext } from '../../Context/ShopContext'


const Trending = () => {


const{trendingProducts} = useContext(ShopContext)
  
  return (
    <div className="trending">
      <h1>Productos Populares</h1>
      <hr />
      <div className="trending-collection">
          {trendingProducts.map((item, i) => {
              return <Item key={i} id={item.id} 
              name={item.title} image={item.image} 
              price={item.price} publisher={item.publisher}/>

          })}
      </div>
  </div>
  )
}

export default Trending