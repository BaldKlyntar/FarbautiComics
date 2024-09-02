import React, {useContext, useState} from 'react'
import './ShopCategoryComponent.css'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'

const ShopCategoryComponent = (props) => {

    const{all_products} = useContext(ShopContext)
    const [maxProducts, setMaxProducts] = useState(12)
  
    const renderBanner = () => {
      if (typeof props.banner === 'string') {
  
        return <img className='shop-category-banner-img' src={props.banner} alt="" />;
      } else {
  
        return <div className='shop-category-banner-img'>{props.banner}</div>;
      }
    };
  
    const handleLoadMore = () => {
      setMaxProducts(prevCount => prevCount + 12)
    }
  
    const filteredProducts = all_products.filter(Item => Item.category === props.category)



  return (
    <div className="shop-category">
        {renderBanner()}
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {filteredProducts.length} products
        </p>
        <input type='text' placeholder='Search' className="shopcategory-search"/>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.slice(0, maxProducts).map((item, i) => (
          <Item
            key={i}
            id= {item.id}
            name={item.title}
            image={item.image}
            price={item.price} />
        ))}
      </div>
      {maxProducts < filteredProducts.length
       ?<button onClick={handleLoadMore} className="shopcategory-loadmore">Explore More</button>
       :<></>}
    </div>
  )
}

export default ShopCategoryComponent