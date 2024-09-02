import React from 'react'
import './UserCollection.css'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";

const UserCollection = (props) => {


  const imageUrl = `http://localhost:5100/${props.image.replace("public\\uploads\\", "")}`; // Solucion temporal
  return (
    <div className="user-collection">
      <div className="usercollection-top">
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={imageUrl} alt="" /></Link>
      </div>
      <div className="usercollection-bottom">
        <h2>{props.name}</h2>
        <p>{props.publisher}</p>
      </div>
    </div>

  )
}

export default UserCollection