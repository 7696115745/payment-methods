import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const storedCartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
  useEffect(() => {
    setCartItems(storedCartItems);
    setCartCount(storedCartCount);
  }, []);

  useEffect(() => {
    if (!storedCartItems == []) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("cartCount", JSON.stringify(cartCount));
    }
  }, [cartItems, cartCount]);

  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
    setCartCount((prevCount) => prevCount + quantity);
  };

  const updateCartItemQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      )
    );
    setCartCount((prevCount) => {
      const items = cartItems.find((item) => item.id === id);
      return prevCount + (items? amount : 0);
    });
  };

  const removeCartItem = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    if (itemToRemove) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setCartCount((prevCount) => prevCount - itemToRemove.quantity);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
