import React, { useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import Headerlogo from "/Assets/Headerlogo.svg";
import { CartContext } from "./CartContext";

export default function Navbar() {
  const location = useLocation();
  const pathName = location.pathname;
  const [isCartMenuVisible, setCartMenuVisible] = useState(false);
  const { cartItems, cartCount, updateCartItemQuantity, removeCartItem } =
    useContext(CartContext);

  const [totalAmount, setTotalAmount] = useState(0);

  const headerStyle = {
    backgroundColor: [
      "/product",
      "/",
      "/about-us",
       "/shop",
    ].includes(pathName)
      ? ""
      : "black",
  };

  const handleMenubar = () => {
    setCartMenuVisible(!isCartMenuVisible);
  };

  const handleCancel = () => {
    setCartMenuVisible(false);
  };

  const increaseQuantity = (id) => {
    updateCartItemQuantity(id, 1);
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item.quantity > 1) {
      updateCartItemQuantity(id, -1);
    }
  };

  const handleremove = (id) => {
    removeCartItem(id);
  };

  useEffect(() => {
    const newTotalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalAmount(newTotalAmount);
  }, [cartItems]);

  return (
    <>
      <div className="Header" style={headerStyle}>
        <div className="wrapper">
          <div className="navbar-parent">
            <div className="Menubar">
              <ul>
                <li>
                  <NavLink className="Headerlink" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="Headerlink" to="/shop">
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink className="Headerlink" to="/about-us">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink className="Headerlink" to="/contact-us">
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="Navbar-image">
              <img src={Headerlogo} alt="Header Logo" />
            </div>
            <div className="search-box">
              <i
                className="fa-solid fa-lg fa-magnifying-glass"
                style={{ color: "#ffffff" }}
              ></i>
              <div className="shopping-count" onClick={handleMenubar}>
                <i
                  className="fa-solid fa-bag-shopping fa-lg"
                  style={{ color: "#ffffff" }}
                ></i>
                <div className="bag-count">{cartCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`Cart-menu ${isCartMenuVisible ? "visible" : ""}`}>
        <h3>Shopping Cart</h3>
        <i className="fa-solid fa-xmark" onClick={handleCancel}></i>
        <hr />
        {cartItems.map((item) => (
          <div key={item.id} className="Added-Cart-items">
            <a href={`/product/${item.id}`}>
              <img src={item.image} alt={item.type} />
            </a>
            <h3>{item.type}</h3>
            <h3>{item.price}</h3>
            <h3>Quantity: {item.quantity}</h3>
            <div className="cart-quantity">
              <input
                type="button"
                value="-"
                onClick={() => decreaseQuantity(item.id)}
              />
              <input type="text" readOnly value={item.quantity} />
              <input
                type="button"
                value="+"
                onClick={() => increaseQuantity(item.id)}
              />
              <input
                type="button"
                value="Delete"
                id="delete"
                onClick={() => handleremove(item.id)}
              />
            </div>
          </div>
        ))}
        {cartItems.length > 0 && (
          <div className="Total-amount">
            <h1>Total Amount</h1>
            <h2>${totalAmount.toFixed(2)}</h2>
          <NavLink to="/Cartsummary"><input type="button" value="Checkout" /></NavLink>
          </div>
        )}
      </div>
    </>
  );
}
