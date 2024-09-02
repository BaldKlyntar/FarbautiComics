import React, {useState, useEffect} from 'react'
import './Trending.css'
//import trending from '../../assets/trending'
import Item from '../Item/Item'
import customFetch from '../../Utils/customFetch'


const Trending = () => {

  const [trendingProducts, setTrendingProducts] = useState([]);


  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const { data } = await customFetch.get('/products/trending');
        setTrendingProducts(data.products);
      } catch (error) {
        console.log(error)

      } 
    };

    fetchTrendingProducts();
  }, []);
  
  return (
    <div className="trending">
      <h1>Trending</h1>
      <hr />
      <div className="trending-collection">
          {trendingProducts.map((item, i) => {
              return <Item key={i} id={item.id} 
              name={item.title} image={item.image} 
              price={item.price}/>

          })}
      </div>
  </div>
  )
}

export default Trending