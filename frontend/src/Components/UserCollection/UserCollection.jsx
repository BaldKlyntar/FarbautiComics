import React from 'react'
import './UserCollection.css'
import { Link } from 'react-router-dom'
import { TiHeartFullOutline } from "react-icons/ti";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";


const UserCollection = (props) => {


  const imageUrl = `http://localhost:5100/${props.image.replace("public\\uploads\\", "")}`; // Solucion temporal
  
  return (
    <div className="user-collection">
        <div className="user-collection-top">
          <div className="user-collection-top-left">
              <img src={imageUrl} alt="" />
          </div>
          <div className="user-collection-top-right">
              <h4>{props.name}</h4>
              <p>{props.artistWriter}</p>
              <p>{props.publisher}</p>
              <div className="collection-hearts">
                <TiHeartFullOutline color='red' size={25}/><p>{props.hearts}</p>
              </div>
              <div className="user-collection-options">
                <Link to={`/product/${props.id}`} ><button className="view-button"><FaLongArrowAltRight color='white'/></button></Link>
                <button className='remove-button'><FaTrashAlt/></button>
              </div>
          </div>
        </div>
    </div>

  )
}

export default UserCollection