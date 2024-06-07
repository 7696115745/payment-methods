import React, { useContext,useState,useEffect } from 'react';
 import { CartContext } from "./CartContext";
import { NavLink } from 'react-router-dom';
export default function Cartsummary() {
  const { cartItems,updateCartItemQuantity, removeCartItem} =
  useContext(CartContext);
  const [amount,setAmount]=useState(0)
  
  const IncreaseQuantity = (id) => {
    updateCartItemQuantity(id, 1);
  };

  const DecreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item.quantity > 1) {
      updateCartItemQuantity(id, -1);
    }
  };

  const HandleRemove = (id) => {
    removeCartItem(id);
  };
  useEffect(() => {
    const newAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setAmount(newAmount);
  }, [cartItems]);
  return (
 <>
   {cartItems.map((items) => (
          <div key={items.id} className="Cart-summary">
            <a href={`/product/${items.id}`}>
              <div className="item-img">
              <img src={items.image} alt={items.type} />
              </div>
            </a>
            <div className="Cart-total-price">
            <h3>Type:{items.type}</h3>
            <h3>Price: {(items.price*items.quantity).toFixed(2)}</h3>
            <h3>Quantity: {items.quantity}</h3>
            <div className="cart-quantity">
              <input
                type="button"
                value="-"
                onClick={() => DecreaseQuantity(items.id)}

                
              />
              <input type="text" readOnly value={items.quantity} />
              <input
                type="button"
                value="+"
                onClick={() => IncreaseQuantity(items.id)}
              />
              <input
                type="button"
                value="Delete"
                id="delete"
                onClick={() => HandleRemove(items.id)}

               />
            </div>
          </div>
       
          </div>
          
        ))}
           <div className="amount">
        <h1>Total Amount</h1>
        <h2>${amount.toFixed(2)}</h2>
          <NavLink to="/payment"><input type="button" value="Proceed to buy" /></NavLink>
        </div>
       
        
 
 
 
 </>  )
}
