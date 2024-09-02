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
        
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error
        
        
      }
      
    }

    // Agregar a Biblioteca
    const addToLibrary = async (productId) => {

      try {

        await customFetch.post(`/users/markasread/${productId}`)
        
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error
        
        
      }
      
    }


    // Agregar a Lista de deseos
    const addToWishlist = async (productId) => {

      try {

        await customFetch.post(`/users/addtowishlist/${productId}`)
        
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error
        
        
      }
      
    }

    // Lista de deseos

    const [wishProducts, setwishProducts] = useState([]);


    useEffect(() => {
        const fetchwishProducts = async () => {
          try {
            const { data } = await customFetch.get('/users/getwishlist');

            setwishProducts(data.wishlist);
      
          } catch (error) {
            console.log(error);
          } 
        };
      
        fetchwishProducts();
      }, []);

    // Lista de Favoritos

    const [favoriteProducts, setfavoriteProducts] = useState([]);


    useEffect(() => {
        const fetchfavoriteProducts = async () => {
          try {
            const { data } = await customFetch.get('/users/getfavorites');

            setfavoriteProducts(data.favorites);
      
          } catch (error) {
            console.log(error);
          } 
        };
      
        fetchfavoriteProducts();
      }, []);


      // Biblioteca

      const [readProducts, setreadProducts] = useState([]);


      useEffect(() => {
          const fetchreadProducts = async () => {
            try {
              const { data } = await customFetch.get('/users/getreadhistory');
  
              setreadProducts(data.readHistory);
        
            } catch (error) {
              console.log(error);
            } 
          };
        
          fetchreadProducts();
        }, []);

      




    const contextValue = {
      all_products,
      deleteProduct,
      isLoading,
      addToFavorites,
      addToLibrary,
      addToWishlist,
      favoriteProducts, 
      readProducts, 
      wishProducts
    };

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;