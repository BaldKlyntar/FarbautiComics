import { useState, useEffect } from 'react';
import './HomeBanner.css'
import { Link } from 'react-router-dom'
import customFetch from '../../Utils/customFetch';
import { TiHeartFullOutline } from "react-icons/ti";

const HomeBanner = () => {

  const [topProduct, setTopProduct] = useState(null);


      const fetchTrendingProducts = async () => {
      try {
        const { data } = await customFetch.get('/products/trending');
        const products = data.products;

        const mostLiked = products.reduce((max, product) =>
            product.hearts > max.hearts ? product : max, products[0])

        setTopProduct(mostLiked);
      } catch (error) {
        console.log(error)

      } 
    };

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  if (!topProduct) return <div className="homebanner-loading">Loading...</div>;

  const imageUrl = `http://localhost:5100/${topProduct.image.replace("public\\uploads\\", "")}`; //Solucion temporal


  return (
    <div className="homebanner">
        <div className="homebanner-left">
            <div className="homebanner-topleft">
                <div className="homebanner-header">
                    <p>People's favorite</p>
                </div>
                <h1>{topProduct.title}</h1>
                <div className="homebanner-hearts">
                    <TiHeartFullOutline size={25} color='red'/>
                    <h3>{topProduct.hearts}</h3>
                </div>
            </div>
            <div className="homebanner-bottomleft">
                <p>{topProduct.description}</p>
            </div>
            <div className="homebanner-buttons">
                <button>Buy Now - ${topProduct.price}</button>
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