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
      <div className="left-profile">
        <div className="user-left-profile">
          <h2>{user.username}</h2>
        </div>
        <div className="specs-left-profile">
            <div className="specs-left-container">
              <FaBookOpen size ={20}/>
              <h4>{user.readHistory.length} Comics Read</h4>
            </div>
            <div className="specs-left-container">
              <FaHeart size ={20}/>
              <h4>{user.favorites.length} Favorites</h4>
            </div>
          </div>
          <hr />
          <div className="options-left-profile">
            <button className="profile-options-button" onClick={() => handleDisplayChange(wishProducts)}>
              <div className="profile-options-container">
                <CiStar size={20}/>
                <h3>Wishlist</h3>
              </div>
            </button>
            <button className="profile-options-button" onClick={() => handleDisplayChange(readProducts)}>
              <div className="profile-options-container">
                <CiBookmark size={20}/>
                <h3>Library</h3>
              </div>
            </button>
              <button className="profile-options-button" onClick={() => handleDisplayChange(favoriteProducts)}>
                <div className="profile-options-container">
                  <CiHeart size={20}/>
                  <h3>Favorites</h3>
                </div>
              </button>
            <button className="profile-options-button">
              <div className="profile-options-container">
                <IoSettingsOutline size={20}/>
                <h3>Settings</h3>
              </div>
            </button>
            <button onClick={logoutUser} className="profile-options-button">
              <div className="profile-options-container">
                <CiLogout size={20}/>
                <h3>Logout</h3>
              </div>
            </button>
          </div>
      </div>
      <div className="right-profile">
        <div className="right-welcome">
          <h1></h1>
        </div>
        <div className="right-profile-container">
            <div className="container-collection">
              {displayedProducts.map((item, i) => {
                return <UserCollection key={i} id={item.id} 
                name={item.title} image={item.image} 
                price={item.price} genre={item.genre}
                publisher={item.publisher} hearts={item.hearts}
                description={item.description}/>

              })}
            </div>
          </div>
      </div>
    </div>


  )
}

export default ProfilePageComponent