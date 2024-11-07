import React, { useState } from 'react';
import Nav from './comp/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';
import Homeproduct from './comp/home_product';
const App = () => {
  // Add To cart
  const [cart, setCart] = useState([]);

  // Shop Page product
  const [shop, setShop] = useState(Homeproduct);

  // Shop Search Filter
  const [search, setSearch] = useState('');

  // Shop category filter
  const Filter = (x) => {
    const catefilter = Homeproduct.filter((product) => product.cat === x);
    setShop(catefilter);
  };

  const allcatefilter = () => {
    setShop(Homeproduct);
  };

  // Shop Search Filter
  const searchlength = (search || []).length === 0;
  const searchproduct = () => {
    if (searchlength) {
      alert('Please Search Something!');
      setShop(Homeproduct);
    } else {
      const searchfilter = Homeproduct.filter((x) => {
        return x.cat === search;
      });
      setShop(searchfilter);
    }
  };

  // Add To Cart
  const addtocart = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist) {
      alert('This product is already added in cart');
    } else {
      alert('Added To Cart');
    }
  };

  return (
    <>
      <BrowserRouter>
        <Nav
          search={search}
          setSearch={setSearch}
          searchproduct={searchproduct}

        />
        <Routes>
          <Route path="/" element={<Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
