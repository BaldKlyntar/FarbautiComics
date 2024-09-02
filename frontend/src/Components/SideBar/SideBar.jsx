import React from 'react'
import './SideBar.css'
import { Link, redirect } from 'react-router-dom'
import plus_icon from '../../assets/plus_icon.png'
import list_icon from '../../assets/list.png'
import customFetch from '../../Utils/customFetch'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/admin/app-stats');
    return data;
  }catch (error) {
    console.log(error)
    return redirect('/');
    
  }
}

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to={'/admin/add-product'} style={{textDecoration: "none"}}>
        <div className="sidebar-item">
          <img src={plus_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/admin/all-products'} style={{textDecoration: "none"}}>
        <div className="sidebar-item">
          <img src={list_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  )
}

export default SideBar