import React, {useState} from 'react'
import { useOutletContext } from 'react-router-dom'
import { PRODUCT_CATEGORY, GENRE_CATEGORY } from '../../../../Utils/Constants'
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
        <h1>Añadir Producto</h1>
        <div className="addproduct-container">
          <div className="addproduct-itemfield">
            <p>Titulo</p>
            <input type="text" name='title' placeholder='Type Here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Precio</p>
            <input type="text" name='price' placeholder='Type Here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Categoria</p>
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
            <p>Artista/Escritor</p>
            <input type="text" name='artistWriter' placeholder='Type Here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Portada</p>
            <input type="text" name='coverArtist' placeholder='type here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Editorial</p>
            <input type="text" name='publisher' placeholder='Marvel Comics, Image Comics, etc' />
          </div>
        </div>
        <div className="addproduct-container">
          <div className="addproduct-itemfield">
            <p>Region de Manufactura</p>
            <input type="text" name='countryManufacture' placeholder='Type Here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Idioma</p>
            <input type="text" name='language' placeholder='type here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Formato</p>
            <input type="text" name='format' placeholder='TPB, Issue, etc' />
          </div>
        </div>
        <div className="addproduct-container">
          <div className="addproduct-itemfield">
            <p>Tipo</p>
            <input type="text" name='type' placeholder='Graphic Novel, Drama, etc' />
          </div>
          <div className="addproduct-itemfield">
            <p>Estilo</p>
            <input type="text" name='style' placeholder='Color, Black and White' />
          </div>
          <div className="addproduct-itemfield">
            <p>Genero</p>
            <select   name="genre" className='add-product-selector' >
                {Object.values(GENRE_CATEGORY).map((itemValue) => {
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
          <div className="addproduct-description">
            <p>Descripcion</p>
            <textarea type="text" name='description' />
          </div>
        </div>
        <label htmlFor="image">
            <div className="area">
              <p>Imagen</p>
              <input  type="file" name='image' id='image' accept= 'image/*'/>
            </div>
          </label>
          <button type='submit' disabled={isSubmitting}  className="addproduct-btn">{isSubmitting ? 'Adding Product...' : 'AÑADIR'}</button>
      </Form>
  )
}

export default AddProductComponent