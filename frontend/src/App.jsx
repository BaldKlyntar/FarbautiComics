import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {
  HomeLayout,
  HomePage,
  ProductPage,
  ShopCategoryPage,
  Login,
  Register,
  CheckOutPage,
  ErrorPage,
  ProfilePage,
  AdminLayout,
  AddProduct,
  EditProduct,
  AllProduct,
  UserSettings,
  
} from './Pages'
import { Marvel } from './Components/Banners/Marvel/Marvel'
import { DC } from './Components/Banners/DC/DC'
import { Misc } from './Components/Banners/Misc/Misc'
import { Animanga } from './Components/Banners/Animanga/Animanga'

import { action as registerAction} from './Components/RegisterComponents/RegisterComponent'
import { action as loginAction } from './Components/LoginComponent/LoginComponent'
import { loader as Profileloader } from './Components/ProfilePageComponent/ProfilePageComponent'
import { action as addproductAction } from './Components/AddProductComponent/AddProductComponent'
import {loader as adminLoader } from './Components/SideBar/SideBar'
import { loader as allproductLoader } from './Components/AllProductComponent/AllProductComponent'







const router = createBrowserRouter([

  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index:true,
        element: <HomePage/>,

      },
      {
        path: "register",
        element: <Register/>,
        action: registerAction
        
      },
      {
        path: "login",
        element: <Login/>,
        action: loginAction
      },
      {
        path:"profile",
        element: <ProfilePage/>,
        loader: Profileloader,
        children: [
          {
            path: "settings",
            element: <UserSettings/>
          },

        ]
      },
      {
        path: "product/:productId",
        element: <ProductPage/>
      },
      {
        path: "checkout",
        element: <CheckOutPage/>
      },
      {
        path: "category/marvel",
        element: <ShopCategoryPage category="marvel" banner={<Marvel/>} />,
      },
      {
        path: "category/dc",
        element: <ShopCategoryPage category="dc" banner={<DC/>} />,
      },
      {
        path: "category/miscellaneous",
        element: <ShopCategoryPage category="miscellaneous" banner={<Misc/>} />,
      },
      {
        path: "category/animanga",
        element: <ShopCategoryPage category="animanga" banner={<Animanga/>} />,
      },
      {
        path: "admin",
        element: <AdminLayout/>,
        loader:adminLoader,
        children: [
          {
            path:"all-products",
            element: <AllProduct/>,
            loader:allproductLoader,
          },
          {
            path:"edit-product/:productId",
            element: <EditProduct/>,
          },
          {
            path: "add-product",
            element: <AddProduct/>,
            action: addproductAction
          }
        ]
      }

    ]
  },
])

const App = () => {
  return (
    <RouterProvider router = { router }/>
  )
}

export default App