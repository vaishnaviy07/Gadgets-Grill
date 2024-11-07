import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Shop from './shop';
import Cart from './cart';
import Wishlist from './Wishlist';
import AdminDashboard from './admin/AdminDashboard'; // Make sure this path is correct
import ProductManagement from './admin/ProductManagement'; // Make sure this path is correct
import OrderManagement from './admin/OrderManagement'; // Make sure this path is correct

const Rout = ({ shop, Filter, allcatefilter, addtocart, cart, setCart }) => {
  const [wishlist, setWishlist] = useState([]); // Define wishlist state

  const addToWishlist = (product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist(prevWishlist => [...prevWishlist, product]);
      console.log("Added to wishlist:", product); // Debugging line
    } else {
      console.log("Product already in wishlist:", product); // Debugging line
    }
  };
  
  const removeFromWishlist = (product) => {
    setWishlist((prevWishlist) => prevWishlist.filter(item => item.id !== product.id));
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Home addtocart={addtocart} addToWishlist={addToWishlist} wishlist={wishlist} />} />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
        <Route path='/shop' element={<Shop shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart} addToWishlist={addToWishlist} />} />
        <Route path='/wishlist' element={<Wishlist wishlist={wishlist} addtocart={addtocart} removeFromWishlist={removeFromWishlist} />} />
        
        {/* Admin routes */}
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/products' element={<ProductManagement />} />
        <Route path='/admin/orders' element={<OrderManagement />} />
      </Routes>
    </>
  );
};

export default Rout;
