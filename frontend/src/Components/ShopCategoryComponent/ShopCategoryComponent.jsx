import React, {useContext, useState} from 'react'
import './ShopCategoryComponent.css'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'

const ShopCategoryComponent = (props) => {

    const{all_products} = useContext(ShopContext)
    const [maxProducts, setMaxProducts] = useState(15)
  
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
      <div className="shop-category-banner">
        {renderBanner()}
        <hr />
      </div>
      <div className="shop-category-content">
        <div className="shop-category-filters">
            <div className="filter-top">
                <h3>Filters</h3>
                <div className="filter-search">
                  <p>Search</p>
                  <input type="text" />
                </div>
            </div>

            <div className="filter-bottom">
                <hr />
                <h4>Format</h4>
                <div className="filter-checkbox">
                  <div className="filter-checkbox-option">
                    <input type="checkbox" name="" id=""/><p>Issue</p>
                  </div>
                  <div className="filter-checkbox-option">
                    <input type="checkbox" /><p>TPB</p>
                  </div>
                  <div className="filter-checkbox-option">
                    <input type="checkbox" name="" id="" /><p>Omnibus</p>
                  </div>
                  <div className="filter-checkbox-option">
                    <input type="checkbox" name="" id="" /><p>Hard Cover</p>
                  </div> 
                </div>
                <hr />
                <p>Price Range</p>
                <div className="filter-price-range">
                    <select name="" id=""></select> 
                    <p>To</p>
                    <select name="" id=""></select>
                </div>
            </div>
        </div>
        <div className="shop-category-comics">
          {filteredProducts.slice(0, maxProducts).map((item, i) => (
            <Item
              key={i}
              id= {item.id}
              name={item.title}
              image={item.image}
              price={item.price}
              publisher= {item.publisher} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopCategoryComponent