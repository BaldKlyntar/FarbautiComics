import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import EditProductComponent from '../Components/EditProductComponent/EditProductComponent'
import { CircleLoader } from 'react-spinners'

const EditProduct = () => {

  const {all_products, isLoading} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_products.find((e) => e.id === productId);

  if (isLoading) {
    return <div><CircleLoader size={150} color="#000000" /></div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <EditProductComponent product = {product}/>
  )
}

export default EditProduct