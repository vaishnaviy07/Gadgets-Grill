import React from 'react';

const Wishlist = ({ wishlist, addtocart, removeFromWishlist }) => {
  return (
    <div>
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty!</p>
      ) : (
        <div>
          {wishlist.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.Name} />
              <h3>{product.Name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addtocart(product)}>Add to Cart</button>
              <button onClick={() => removeFromWishlist(product)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
