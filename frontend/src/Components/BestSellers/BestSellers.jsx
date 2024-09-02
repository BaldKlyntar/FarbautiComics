import React, { useEffect, useState } from 'react'
import './BestSellers.css'
//import data from '../../assets/data'
import Item from '../Item/Item'
import customFetch from '../../Utils/customFetch'





const BestSellers = () => {

  const [newProducts, setnewProducts] = useState([]);


  useEffect(() => {
    const fetchnewProducts = async () => {
      try {
        const { data } = await customFetch.get('/products/newproducts');
        setnewProducts(data.products);
      } catch (error) {
        console.log(error)
      } 
    };

    fetchnewProducts();
  }, []);

  return (
    <div className="bestseller">
      <h1>New Products</h1>
      <hr />
      <div className="bestseller-item">
        {newProducts.map((item, i) =>{
            return <Item key={i} id={item.id} 
            name={item.title} image={item.image} 
            price={item.price}/>
        })}
      </div>
    </div>
  )
}

export default BestSellers