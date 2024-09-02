import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay'
import { DescriptionBox } from '../Components/DescriptionBox/DescriptionBox'
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts'
import { CircleLoader } from 'react-spinners'

const ProductPage = () => {

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
    <div>
      <ProductDisplay product = {product}/>
      <DescriptionBox product = {product}/>
      <RelatedProducts category= {product.category} />
    </div>
  )
}

export default ProductPage