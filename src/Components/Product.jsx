import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import Data from "../Data";
import { CartContext } from "./CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
 
export default function Product() {
  const Navigate=useNavigate()

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = () => {
      const productData = Data.find((item) => item.id === parseInt(id));
      setProduct(productData);
    };

    fetchProduct();
  }, []);

  const HandleQuantityIncrement = () => {
    setCount(count + 1);
  };

  const HandleQuantityDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
     addToCart(product, count);
    toast.success("Added sucessfully", { 
      position: "top-center", 
     });

     setTimeout(() => {
Navigate('/shop')
 
    }, 2000);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div className="item-details">
        <div className="wrapper">
          <div className="item-details-inner">
            <div className="left-part">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="right-part">
              <h6>{product.type}</h6>
              <h5>{product.title}</h5>
              <h4>
                ${product.price} <span>& Free Shipping</span>
              </h4>
              <p>{product.description}</p>
              <hr />
              <div className="quantity">
                <div className="quantity-amount">
                  <input
                    type="button"
                    value="-"
                    onClick={HandleQuantityDecrement}
                  />
                  <input type="text" value={count} readOnly />
                  <input
                    type="button"
                    value="+"
                    onClick={HandleQuantityIncrement}
                  />
                </div>
                <div className="Add-to-cart">
                    <input
                      type="button"
                      value="Add To Cart"
                      onClick={handleAddToCart}
                    />
                  <ToastContainer/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
