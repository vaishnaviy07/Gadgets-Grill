import React, { useState } from 'react';
import './shop.css';
import { AiFillHeart, AiOutlineHeart, AiFillEye, AiOutlineClose } from 'react-icons/ai';

const Shop = ({ shop, Filter, allcatefilter, addtocart, addToWishlist }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState([]);
  const [wishlistedItems, setWishlistedItems] = useState([]); // Store wishlisted item IDs

  // Showing Detail Box
  const detailpage = (product) => {
    setDetail(product);
    setShowDetail(true);
  };

  const closedetail = () => {
    setShowDetail(false);
  };

  // Toggle Wishlist State
  const toggleWishlist = (product) => {
    if (wishlistedItems.includes(product.id)) {
      // Remove from wishlist if already wishlisted
      setWishlistedItems(wishlistedItems.filter((id) => id !== product.id));
    } else {
      // Add to wishlist if not already in it
      setWishlistedItems([...wishlistedItems, product.id]);
      addToWishlist(product);
    }
  };

  // Check if product is wishlisted
  const isWishlisted = (product) => {
    return wishlistedItems.includes(product.id);
  };

  return (
    <>
      {showDetail ? (
        <div className='product_detail'>
          <button className='close_btn' onClick={closedetail}>
            <AiOutlineClose />
          </button>
          <div className='container'>
            <div className='img_box'>
              <img src={detail.image} alt={detail.Name} />
            </div>
            <div className='info'>
              <h4>{detail.cat}</h4>
              <h2>{detail.Name}</h2>
              <p>Product description goes here.</p>
              <h3>${detail.price}</h3>
              <button onClick={() => addtocart(detail)}>Add To Cart</button>
            </div>
          </div>
        </div>
      ) : null}

      <div className='shop'>
        <h2>Shop Products</h2>
        <p>Home . Shop</p>
        <div className='container'>
          <div className='left_box'>
            <div className='category'>
              <h3>All Categories</h3>
              <ul>
                <li onClick={() => allcatefilter()}>All</li>
                <li onClick={() => Filter('tv')}>Tv</li>
                <li onClick={() => Filter('laptop')}>Laptop</li>
                <li onClick={() => Filter('watch')}>Watch</li>
                <li onClick={() => Filter('speaker')}>Speaker</li>
                <li onClick={() => Filter('electronics')}>Electronics</li>
                <li onClick={() => Filter('headphone')}>Headphone</li>
                <li onClick={() => Filter('phone')}>Phone</li>
              </ul>
            </div>
          </div>

          <div className='right_box'>
            <div className='product_box'>
              <h2>Products</h2>
              <div className='product_container'>
                {shop.map((product) => (
                  <div className='box' key={product.id}>
                    <div className='img_box'>
                      <img src={product.image} alt={product.Name} />
                      <div className='icon'>
                        <li onClick={() => toggleWishlist(product)}>
                          {isWishlisted(product) ? (
                            <AiFillHeart color='red' />
                          ) : (
                            <AiOutlineHeart />
                          )}
                        </li>
                        <li onClick={() => detailpage(product)}>
                          <AiFillEye />
                        </li>
                      </div>
                    </div>
                    <div className='detail'>
                      <h3>{product.Name}</h3>
                      <p>${product.price}</p>
                      <button onClick={() => addtocart(product)}>Add To Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
