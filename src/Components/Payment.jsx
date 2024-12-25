import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiPhonepe } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa6";
import { FaStripe } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { FaPaypal } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import sha256 from "sha256";
 import { Buffer } from 'buffer';

export default function Payment() {
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
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartCount");
      window.location.reload();
    }, 2000);
  };

  const handlePhonePe = async () => {
    try {
      const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);

      const payload = {
        merchantId: "PGTESTPAYUAT",
        merchantTransactionId:"MT7850590068188104",
        merchantUserId: "MU933037302229373",
        amount: 1000,
        redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
        redirectMode: "REDIRECT",
        callbackUrl: `http://localhost:3000/api/status/${transactionid}`,
        mobileNumber: '6280156850',
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };

      const DataPayLoad = JSON.stringify(payload);
      const dataBase64 = Buffer.from(DataPayLoad).toString("base64");
      const fullURL = dataBase64 + "/pg/v1/pay" + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
      const dataSha256 = sha256(fullURL);
      const checksum = dataSha256 + "###" + 1;

      // console.log("Payload:", payload);
      // console.log("Base64:", dataBase64);
      // console.log("Checksum:", checksum);

        const response = await fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', {
        method: "POST",
        headers: {
          accept: 'application/json',
          'Content-Type':'application/json',
          "X-VERIFY": checksum,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        const redirect = data?.data?.instrumentResponse?.redirectInfo?.url;
        if (redirect) {
          window.location.href = redirect;
        } else {
          toast.error("Payment response did not include a redirect URL.", {
            position: "top-center",
          });
        }
      } else {
        console.error("API Error:", await response.text());
        toast.error("Payment API call failed.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      toast.error("Payment processing encountered an error.", {
        position: "top-center",
      });
    }
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
              <SiPhonepe size={27} onClick={() => handlePhonePe()} />
              <FaGooglePay size={27} />
              <FaStripe size={27} />
              <SiRazorpay size={27} />
              <FaPaypal size={27} />
            </div>
          </div>

        </div>

      </form>
    </>
  );
}
