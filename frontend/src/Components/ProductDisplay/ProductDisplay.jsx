import React, { useContext, useState} from 'react'
import './ProductDisplay.css'
import { FaRegHeart, FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { IoBookOutline, IoBook } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';


export const ProductDisplay = (props) => {



  const {product} = props;

  const {addToFavorites, addToLibrary, addToWishlist} = useContext(ShopContext)

  const imageUrl = `http://localhost:5100/${product.image.replace("public\\uploads\\", "")}`; //Solucion temporal

  const [isUser, setUser] = useState(true);

  const [isWishlistClicked, setIsWishlistClicked] = useState(false);
  const [isFavoritesClicked, setIsFavoritesClicked] = useState(false);
  const [isReadClicked, setIsReadClicked] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlistClicked(!isWishlistClicked);
    addToWishlist(product.id)
  };


  const handleFavoritesClick = () => {

    setIsFavoritesClicked(!isFavoritesClicked);
    addToFavorites(product.id)

    
  };

  const handleReadClick = () => {
    setIsReadClicked(!isReadClicked);
    addToLibrary(product.id)
  };

  return (
    <div className="product-display">
      <section className="product-display-header">
        <div className="product-display-header-img">
          <div>
            <img src={imageUrl} alt="" />
          </div>
        </div>
        <div className="product-display-header-specs">
          <div>
              <h1>{product.title}</h1>
              <h2>${product.price}</h2>
          </div>
          <div className='product-display-container'>
            <div className="product-display-header-button">
              {isUser?
                <button>Add to Cart</button>
                :<Link to='/register'><button>Add to Cart</button></Link>
              }
            </div>
            <div className="product-display-header-hearts">
              <div className="hearts-container">
              <FaHeart size={25}/>
              <h3>{product.hearts}</h3>
            </div>
        </div>
      </div>
        {isUser?
          <div className="product-display-widgets">
            <div
              className="product-display-widgets-container"
              onClick={handleWishlistClick}
            >
                {isWishlistClicked ? <FaStar size={22} color="#e3f039" /> : <FaRegStar size={22} />}
                <h4>Add to Wishlist</h4>
            </div>
            <div
              className="product-display-widgets-container"
              onClick={handleFavoritesClick}
            >
              {isFavoritesClicked ? <FaHeart size={22} color="red" /> : <FaRegHeart size={22} />}
              <h4>Add to Favorites</h4>
            </div>
            <div
              className="product-display-widgets-container"
              onClick={handleReadClick}
            >
              {isReadClicked ? <IoBook size={22} color="green" /> : <IoBookOutline size={22} />}
              <h4>Mark as Read</h4>
            </div>
          </div>
          :<></>}
        </div>
      </section>
      

    </div>
  )
}

