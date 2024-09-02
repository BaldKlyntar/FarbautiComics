import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {

  const imageUrl = `http://localhost:5100/${props.image.replace("public\\uploads\\", "")}`; // Solucion temporal


  return (
    <div className="item">
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={imageUrl} alt="" /></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price">
                ${props.price}
            </div>
        </div>
    </div>
  )
}

export default Item