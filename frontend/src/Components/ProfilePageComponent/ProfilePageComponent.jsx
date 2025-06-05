import React,{useContext, useEffect, useState} from 'react'
import { Link, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import customFetch from '../../Utils/customFetch';
import './ProfilePageComponent.css'
import { FaUserCircle } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { toast } from 'react-toastify';
import { CiHeart } from "react-icons/ci";
import UserCollection from '../UserCollection/UserCollection';
import { ShopContext } from '../../Context/ShopContext';

// loader, carga los datos que se encuentran en el endpoint profile
// los cuales contienen los atributos del usuario

export const loader = async () => {
    try {
      const { data } = await customFetch.get('/users/profile');
      return data;
    }catch (error) {
      return redirect('/');
    }
  }


const ProfilePageComponent = () => {

const {favoriteProducts, readProducts, wishProducts} = useContext(ShopContext)
const[displayedProducts, setDisplayedProducts] = useState(favoriteProducts)




    const { user } = useLoaderData();
    const navigate = useNavigate();
    console.log(user)

    const logoutUser = async () => {
        navigate('/');
        await customFetch.get('/auth/logout')
        toast.success('Logging Out...')

    }

    const handleDisplayChange = (products) => {
      setDisplayedProducts(products);

    }




  return (

    <div className="profile">
      <div className="profile-top">
        <div className="profile-top-left">
          <h2>{user.name} {user.lastName}</h2>
          <p>{user.username}</p>
          <p>{user.address}</p>
        </div>
        <div className="profile-top-right">
          <div className="profile-top-right-numbers">
            <h2>{user.readHistory.length}</h2>
            <p>Comics read</p>
          </div>
          <div className="profile-top-right-numbers">
            <h2>{user.favorites.length}</h2>
            <p>Favorites</p>
          </div>
          <div className="profile-top-right-numbers">
            <h2>{user.wishlist.length}</h2>
            <p>Wishlist</p>
          </div>
        </div>
      </div>
      <div className="profile-bottom">
        <div className="profile-bottom-options">
          <button className="bottom-options" onClick={() => handleDisplayChange(readProducts)}>
              <p>Library ({user.readHistory.length})</p>
          </button>
          <button className="bottom-options" onClick={() => handleDisplayChange(favoriteProducts)}>
              <p>Favorites ({user.favorites.length})</p>
          </button>
          <button className="bottom-options" onClick={() => handleDisplayChange(wishProducts)}>
              <p>Wishlist ({user.wishlist.length})</p>
          </button>
          <button className="bottom-options" onClick={logoutUser}>
              <p>Log out</p>
          </button>
        </div>
        <div className="profile-bottom-collections">
              {displayedProducts.map((item, i) => {
                return <UserCollection key={i} id={item.id} 
                name={item.title} image={item.image} 
                genre={item.genre} artistWriter = {item.artistWriter}
                publisher={item.publisher} hearts={item.hearts}
                description={item.description}/>

              })}
        </div>
      </div>

    </div>


  )
}

export default ProfilePageComponent