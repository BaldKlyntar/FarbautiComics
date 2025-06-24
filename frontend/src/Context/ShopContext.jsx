import React, { createContext, useEffect, useState} from "react"
import customFetch from "../Utils/customFetch";
import { toast } from 'react-toastify'
import { redirect} from 'react-router-dom'


export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {

    const [all_products, setAll_Product] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

        //Todos los productos

        useEffect(() => {
          const fetchAllProducts = async () => {
            try {
              const { data } = await customFetch.get('/products/allproducts');
              setAll_Product(data.products);
            } catch (error) {
                console.log(error)
            } finally {
              setIsLoading(false); // Termina la carga
            }
          };
      
          fetchAllProducts();
        }, []);

        // Productos populares

        const [trendingProducts, setTrendingProducts] = useState([]);

        useEffect(() => {
          const fetchTrendingProducts = async () => {
            try {
              const {data} = await customFetch.get('/products/trending');
              setTrendingProducts(data.products);

            } catch (error){
              console.log(error)
            } 
          };

          fetchTrendingProducts();

          
        }, [])


        // Eliminar producto 

        const deleteProduct = async (productId) => {
          try {
            await customFetch.delete(`/products/${productId}`);
            toast.success('Product Deleted');
          } catch (error) {
            toast.error(error?.response?.data?.msg);
            return error;
          }
        };




    // Agregar a Favoritos
    const addToFavorites = async (productId) => {

      try {

        await customFetch.post(`/users/addtofavorites/${productId}`)
        toast.success('Product added to favorites')
        
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error
        
        
      }
      
    }

    // Agregar a Biblioteca
    const addToLibrary = async (productId) => {

      try {

        await customFetch.post(`/users/markasread/${productId}`)
        toast.success('Product mark as read')
        
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error
        
        
      }
      
    }


    // Agregar a Lista de deseos
    const addToWishlist = async (productId) => {

      try {

        await customFetch.post(`/users/addtowishlist/${productId}`),
        toast.success('Product added to wishlist')
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error
        
        
      }
      
    }

   
      




    const contextValue = {
      all_products,
      trendingProducts,
      deleteProduct,
      isLoading,
      addToFavorites,
      addToLibrary,
      addToWishlist,
    };

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;