import React, { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Homeproduct from './home_product';
import { AiFillEye, AiFillHeart } from "react-icons/ai";

const Home = ({ addtocart, wishlist, addToWishlist }) => {
  // Product categories
  const [newProduct, setNewProduct] = useState([]);
  const [featuredProduct, setFeaturdProduct] = useState([]);
  const [topProduct, setTopProduct] = useState([]);

  // Trending Products
  const [trendingProduct, setTrendingProduct] = useState(Homeproduct);

  // Filter trending product
  const filtercate = (x) => {
    const filterproduct = Homeproduct.filter((curElm) => curElm.type === x);
    setTrendingProduct(filterproduct);
  };

  // Show all trending products
  const allTrendingProduct = () => {
    setTrendingProduct(Homeproduct);
  };

  // Product Type
  useEffect(() => {
    productcategory();
  }, []);

  const productcategory = () => {
    // New Product
    const newcategory = Homeproduct.filter((x) => x.type === 'new');
    setNewProduct(newcategory);

    // Featured Product
    const featuredcategory = Homeproduct.filter((x) => x.type === 'featured');
    setFeaturdProduct(featuredcategory);

    // Top Product
    const topcategory = Homeproduct.filter((x) => x.type === 'top');
    setTopProduct(topcategory);
  };

  return (
    <div className='home'>
      <div className='top_banner'>
        <div className='contant'>
          <h3>silver aluminum</h3>
          <h2>Apple Watch</h2>
          <p>30% off at your first order</p>
          <Link to='/shop' className='link'>Shop Now</Link>
        </div>
      </div>
      <div className='trending'>
        <div className='container'>
          <div className='left_box'>
            <div className='header'>
              <div className='heading'>
                <h2 onClick={allTrendingProduct}>Trending Product</h2>
              </div>
              <div className='cate'>
                <h3 onClick={() => filtercate('new')}>New</h3>
                <h3 onClick={() => filtercate('featured')}>Featured</h3>
                <h3 onClick={() => filtercate('top')}>Top Selling</h3>
              </div>
            </div>
            <div className='products'>
              <div className='container'>
                {trendingProduct.map((curElm) => (
                  <div className='box' key={curElm.id}>
                    <div className='img_box'>
                      <img src={curElm.image} alt={curElm.Name} />
                      <div className='icon'>
                        <div className='icon_box'>
                          <AiFillEye />
                        </div>
                        <div className='icon_box' onClick={() => addToWishlist(curElm)}>
                          <AiFillHeart
                            style={{ color: wishlist.some(item => item.id === curElm.id) ? 'red' : 'gray' }} 
                          />
                        </div>
                      </div>
                    </div>
                    <div className='info'>
                      <h3>{curElm.Name}</h3>
                      <p>${curElm.price}</p>
                      <button className='btn' onClick={() => addtocart(curElm)}>Add to cart</button>
                    </div>
                  </div>
                ))}
              </div>
              <button>Show More</button>
            </div>
          </div>
          <div className='right_box'>
            {/* Right-side content such as testimonials, newsletter, etc. */}
          </div>
        </div>
      </div>
      <div className='product_type'>
        <div className='container'>
          {/* Render new, featured, and top products similarly */}
        </div>
      </div>
    </div>
  );
}

export default Home;
