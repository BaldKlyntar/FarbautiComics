import { useState, useEffect, useContext } from 'react';
import './HomeBanner.css'
import { Link } from 'react-router-dom'
import customFetch from '../../Utils/customFetch';
import { TiHeartFullOutline } from "react-icons/ti";
import { ShopContext } from '../../Context/ShopContext';

const HomeBanner = () => {

  const {trendingProducts} = useContext(ShopContext)

  const products = trendingProducts;

  const mostLiked = products.reduce((max, product) =>
          product.hearts > max.hearts ? product : max, products[0])


  if (!mostLiked) return <div className="homebanner-loading">Loading...</div>;

  const imageUrl = `http://localhost:5100/${mostLiked.image.replace("public\\uploads\\", "")}`; //Solucion temporal


  return (
    <div className="homebanner">
        <div className="homebanner-left">
            <div className="homebanner-topleft">
                <div className="homebanner-header">
                    <p>People's favorite</p>
                </div>
                <h1>{mostLiked.title}</h1>
                <div className="homebanner-hearts">
                    <TiHeartFullOutline size={25} color='red'/>
                    <h3>{mostLiked.hearts}</h3>
                </div>
            </div>
            <div className="homebanner-bottomleft">
                <p>{mostLiked.description}</p>
            </div>
            <div className="homebanner-buttons">
                <button>Buy Now - ${mostLiked.price}</button>
                <button>Add to Wishlist</button>
            </div>
        </div>
        <div className="homebanner-right">
            <img src={imageUrl} alt="" />
        </div>
  </div>
  )
}

export default HomeBanner