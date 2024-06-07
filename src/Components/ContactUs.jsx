import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ContactUs() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const HandleSubmit = (e) => {
    e.preventDefault();
    
    console.log(username);
    console.log(email);
    console.log(password);
  };
   return (
    <>
      <div className="Reach-text">
        <h4>Get in Touch</h4>
        <h2>
          We value the connection with our community and are here to assist in
          any way we can. Feel free to reach out through the following channels:
        </h2>
      </div>

      <div className="form">
        <div className="wrapper">
          <div className="form-parent">
            <div className="form-left-part">
              <form onSubmit={HandleSubmit}>
                <div className="Input-name">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="name"
                    pattern="^[A-Za-z]*$"
                    title="number are not allowed"
                    onChange={(e)=>setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
                <div className="Input-Email">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="email"
                    pattern="[^@\s]+@[^@\s]+"
                    title="Invalid email address"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}

                    required
                  />
                </div>
                <div className="Input-Password">
                  <input
                    type="password"
                    placeholder="Enter yuor Password"
                    className="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}

                    required
                  />
                </div>
                <div className="TextArea">
                  <textarea name="" id="" className="textarea"></textarea>{" "}
                </div>
                <div className="submit-btn">
                  <button >Send</button>
                </div>
              </form>
            </div>
            <div className="form-right-part">
              <div className="contact-details">
                <div className="Mobile-number">
                  <h5>Phone</h5>
                  <h3>6280156850</h3>
                </div>
                <div className="Contact-by-Email">
                  <h5>Email</h5>
                  <h3>rs009161@gmail.com</h3>
                </div>
              </div>
              <hr className="hr" />
              <div className="Address">
                <h3>2972 Westheimer Rd. Santa Ana, Illinois 85486</h3>
              </div>
              <hr className="hr" />
              <div className="social-medias">
                <div className="follow-us">
                  <p>FOLLOW US:</p>
                </div>
                <div className="social-media-icons">
                  <NavLink to="" className="icons-of-social-media">
                    {" "}
                    <i className="fa-brands fa-lg fa-facebook"></i>
                  </NavLink>
                  <NavLink to="" className="icons-of-social-media">
                    {" "}
                    <i className="fa-brands fa-lg fa-twitter"></i>
                  </NavLink>
                  <NavLink to="" className="icons-of-social-media">
                    {" "}
                    <i className="fa-brands fa-lg fa-instagram"></i>
                  </NavLink>
                  <NavLink to="" className="icons-of-social-media">
                    {" "}
                    <i className="fa-brands fa-lg fa-pinterest-p"></i>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
