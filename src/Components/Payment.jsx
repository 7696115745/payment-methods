import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    zip: "",
  });

  const notify = () => {
    toast.success("Payment success", {
      position: "top-center",
    });

    setTimeout(() => {
      navigate("/");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartCount");
      window.location.reload();
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, cardNumber, expirationDate, cvc, zip } =
      formData;

    if (
      firstName &&
      lastName &&
      email &&
      cardNumber &&
      expirationDate &&
      cvc &&
      zip
    ) {
      notify();
    } else {
      toast.error("Please fill all fields", {
        position: "top-center",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
   
      <form onSubmit={handleSubmit}>
      <div className="Heading-for-payment">
    <h1>Payment</h1>
    </div>
        <div className="payment-details">
          <div className="payment-inner-part">
            <div className="cart-Holder">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                pattern="^[A-Za-z ]*$"
                minLength="2"
                title="number are not allowed"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                pattern="^[A-Za-z ]*$"
                minLength="2"
                required
                title="number are not allowed"
              />
            </div>
            <div className="Email-address">
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Cart-number">
              <input
                type="number"
                name="cardNumber"
                placeholder="Enter your card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Expiry">
              <input
                type="text"
                name="expirationDate"
                placeholder="Expiration Date"
                value={formData.expirationDate}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="cvc"
                placeholder="CVC"
                value={formData.cvc}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="zip"
                placeholder="ZIP"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
            <div className="submit-btn">
              <button type="submit">Submit</button>
              <ToastContainer />
            </div>
            <div className="payment-methods">
        <i className="fa-brands  fa-2xl fa-cc-visa" style={{color: "#ffd43b;"}}></i>
        <i className="fa-regular fa-credit-card fa-2xl"></i> 
        <i className="fa-brands fa-google-pay fa-2xl"></i>
        <i className="fa-brands fa-cc-paypal fa-2xl"></i>
        <i className="fa-brands fa-apple-pay fa-2xl"></i>
        <i className="fa-brands fa-cc-mastercard fa-2xl"></i>
        <i className="fa-brands fa-cc-amazon-pay fa-2xl"></i>
        </div>
          </div>
          
        </div>
     
             </form>
     </>
  );
}
