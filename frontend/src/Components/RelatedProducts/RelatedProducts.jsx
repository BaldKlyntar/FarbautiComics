import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
//import data_product from '../../assets/data'
import  Item  from '../Item/Item'
import customFetch from '../../Utils/customFetch'



export const RelatedProducts = (props) => {

  const [relatedProducts, setRelatedProducts] = useState([]);

  const{category} = props;


  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        if(category){

          const { data } = await customFetch.get(`/products/related?category=${category}`);
          setRelatedProducts(data.products);

        }

      } catch (error) {
        console.log(error)

      } 
    };

    fetchRelatedProducts();
  }, []);
  return (
    <div className="relatedproducts">
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {relatedProducts.map((item, i) =>{
                return <Item key={i} id={item.id} 
                name={item.title} image={item.image} 
                price={item.price}/>
            })}
        </div>
        
    </div>
  )
}
