import React, { useContext } from 'react'
import './AllProductComponent.css'
//import all_products from '../../assets/all_product'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import customFetch from '../../Utils/customFetch'
import { ShopContext } from '../../Context/ShopContext'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/products/allproducts');
    return data.products;
  }catch (error) {
    console.log(error)
    return redirect('/');
    
  }
}

const AllProductComponent = () => {


  const {deleteProduct} = useContext(ShopContext)



  const all_products = useLoaderData();
  
  return (
    <div className="list-product">
    <h1>Product List</h1>
    <div className="listproduct-format-main">
      <p>Products</p>
      <p>Title</p>
      <p>Price</p>
      <p>Category</p>
      <p>Actions</p>
    </div>
    <div className="listproduct-allproducts">
      <hr />
      {all_products.map((product, index)=>{
        return <><div key={index} className="listproduct-format-main listproduct-format">
          <img src={`http://localhost:5100/${product.image.replace("public\\uploads\\", "")}`} alt="" className="listproduct-product-icon" />
          <p>{product.title}</p>
          <p>${product.price}</p>
          <p>{product.category}</p>
          <div className="listproduct-allproducts-btn">
            <Link to={`/admin/edit-product/${product.id}`}><button>Edit</button></Link>
            <button onClick={()=>{deleteProduct(product._id)}}>Remove</button>
          </div>
        </div>
        <hr />
        </>
      })}
    </div>
  </div>
  )
}

export default AllProductComponent