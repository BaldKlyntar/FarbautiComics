import React, {useState} from 'react'
import { useOutletContext } from 'react-router-dom'
import { PRODUCT_CATEGORY } from '../../../../Utils/Constants'
import './AddProductComponent.css'
import customFetch from '../../Utils/customFetch'
import { toast } from 'react-toastify'
import { Form, redirect, useNavigation} from 'react-router-dom'


export const action = async ({ request }) => {
  const formData = await request.formData();


  try {
    await customFetch.post('/products/addproduct', formData);
    toast.success('Product Added');
    return redirect('/admin/add-product');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};



const AddProductComponent = () => {

  

  const navigation = useNavigation()
  console.log(navigation);
  const isSubmitting = navigation.state === 'submitting'
  return (
      <Form method= 'post' className="add-product" encType='multipart/form-data'>
        <h1>Add Product</h1>
        <div className="addproduct-container">
          <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input type="text" name='title' placeholder='Type Here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Product Price</p>
            <input type="text" name='price' placeholder='Type Here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Category</p>
            <select   name="category" className='add-product-selector' >
                {Object.values(PRODUCT_CATEGORY).map((itemValue) => {
                  return(
                    <option key={itemValue} value= {itemValue}>
                      {itemValue}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="addproduct-container">
          <div className="addproduct-itemfield">
            <p>Artist/Writer</p>
            <input type="text" name='artistWriter' placeholder='Type Here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Cover Artist</p>
            <input type="text" name='coverArtist' placeholder='type here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Publisher</p>
            <input type="text" name='publisher' placeholder='Marvel Comics, Image Comics, etc' />
          </div>
        </div>
        <div className="addproduct-container">
          <div className="addproduct-itemfield">
            <p>Country/Region of Manufacture</p>
            <input type="text" name='countryManufacture' placeholder='Type Here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Language</p>
            <input type="text" name='language' placeholder='type here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Format</p>
            <input type="text" name='format' placeholder='TPB, Issue, etc' />
          </div>
        </div>
        <div className="addproduct-container">
          <div className="addproduct-itemfield">
            <p>Type</p>
            <input type="text" name='type' placeholder='Graphic Novel, Drama, etc' />
          </div>
          <div className="addproduct-itemfield">
            <p>Style</p>
            <input type="text" name='style' placeholder='Color, Black and White' />
          </div>
          <div className="addproduct-itemfield">
            <p>Genre</p>
            <input type="text" name='genre' placeholder='Action, Comedy, etc' />
          </div>
        </div>
        <div className="addproduct-container">
          <div className="addproduct-description">
            <p>Product Description</p>
            <input type="text" name='description'/>
          </div>
        </div>
        <label htmlFor="image">
            <div className="area">
              <p>Image</p>
              <input  type="file" name='image' id='image' accept= 'image/*'/>
            </div>
          </label>
          <button type='submit' disabled={isSubmitting}  className="addproduct-btn">{isSubmitting ? 'Adding Product...' : 'ADD'}</button>
      </Form>
  )
}

export default AddProductComponent