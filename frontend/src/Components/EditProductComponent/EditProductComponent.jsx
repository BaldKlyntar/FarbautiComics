import React from 'react'
import './EditProductComponent.css'

const EditProductComponent = (props) => {
  const {product} = props;

  const imageUrl = `http://localhost:5100/${product.image.replace("public\\uploads\\", "")}`; //Solucion temporal
  return (
    <div className="edit-product">
      <div className="edit-product-image">
        <img src={imageUrl} alt="" />
        <label htmlFor="file-input">
            <div className="edit-area">
              <input  type="file" name='image' id='file-input' hidden required/>
              <img src='' className='product-view' alt="" />
            </div>
          </label>
      </div>
      <div className="edit-product-elements">
      <h1>Edit Product</h1>
        <div className="edit-product-container">
          <div className="edit-product-itemfield">
            <p>Product Title</p>
            <input type="text" name='name' placeholder={product.title} />
          </div>
          <div className="edit-product-itemfield">
            <p>Product Price</p>
            <input type="text" name='price' placeholder={product.price} />
          </div>
          <div className="edit-product-itemfield">
            <p>Category</p>
            <select   name="category" className='add-product-selector' defaultValue={product.category}>
              <option value=""></option>
              <option value="marvel">Marvel</option>
              <option value="dc">DC</option>
              <option value="miscellaneous">Miscellaneous</option>
              <option value="animanga">Animanga</option>
            </select>
          </div>

        </div>
        <div className="edit-product-container">
          <div className="edit-product-itemfield">
              <p>Artist/Writer</p>
              <input type="text" name='artist' placeholder={product.artistWriter} />
          </div>
          <div className="edit-product-itemfield">
            <p>Cover Artist</p>
            <input type="text" name='cover' placeholder={product.coverArtist} />
          </div>
        </div>
        <div className="edit-product-container">

          <div className="edit-product-itemfield">
            <p>Publisher</p>
            <input type="text" name='publisher' placeholder={product.publisher} />
          </div>
          <div className="edit-product-itemfield">
            <p>Country/Region of Manufacture</p>
            <input type="text" name='country' placeholder={product.countryManufacture} />
          </div>
        </div>
        <div className="edit-product-container">
          <div className="edit-product-itemfield">
            <p>Language</p>
            <input type="text" name='language' placeholder={product.language} />
          </div>
          <div className="edit-product-itemfield">
            <p>Format</p>
            <input type="text" name='format' placeholder={product.format} />
          </div>

        </div>
        <div className="edit-product-container">

          <div className="edit-product-itemfield">
            <p>Style</p>
            <input type="text" name='cover' placeholder={product.style} />
          </div>
          <div className="edit-product-itemfield">
            <p>Genre</p>
            <input type="text" name='genre' placeholder={product.genre} />
          </div>
          <div className="edit-product-itemfield">
            <p>Type</p>
            <input type="text" name='type' placeholder={product.type} />
          </div>
        </div>
        <div className="edit-product-container">
          <div className="edit-product-description">
            <p>Product Description</p>
            <input type="text" name='description' placeholder={product.description}/>
          </div>
        </div>
          <button  className="edit-product-btn">UPDATE</button>
      </div>
    </div>
  )
}

export default EditProductComponent