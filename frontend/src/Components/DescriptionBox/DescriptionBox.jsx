import React, {useState} from 'react'
import './DescriptionBox.css'

export const DescriptionBox = (props) => {

  const [state, setState] = useState("Description")
  const {product} = props;
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div onClick={() => setState("Description")} className={`descriptionbox-nav-box ${state === "Description" ? "active" : ""}`}>
          Description
        </div>
        <div onClick={() => setState("Details")} className={`descriptionbox-nav-box ${state === "Details" ? "active" : ""}`}>
          Details
        </div>
      </div>
      <div className="descriptionbox-description">
        {state === "Details" ?
          <div className="details fade-in">
            <div className="details-left">
              <p><strong>Artist/Writer:</strong> {product.artistWriter}</p>
              <p><strong>Cover Artist:</strong> {product.coverArtist}</p>
              <p><strong>Language:</strong> {product.language}</p>
            </div>
            <div className="details-middle">
              <p><strong>Style:</strong> {product.style}</p>
              <p><strong>Country/Region of Manufacture:</strong> {product.countryManufacture}</p>
              <p><strong>Type:</strong> {product.type}</p>
            </div>
            <div className="details-right">
              <p><strong>Publisher:</strong> {product.publisher}</p>
              <p><strong>Genre:</strong> {product.genre}</p>
              <p><strong>Format:</strong> {product.format}</p>
            </div>
          </div>
          :
          <p className="fade-in">
            {product.description}
          </p>
        }
      </div>
    </div>
  )
}

