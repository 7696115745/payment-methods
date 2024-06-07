import React from "react";
import { NavLink } from "react-router-dom";
import Img01 from "/Assets/Img01.jpg";
import Shopbanner from "/Assets/Shopbanner.jpg";
import Contactbaneer from "/Assets/Contactbaneer.jpg";
import Aboutbanner from "/Assets/Aboutbanner.jpg";
import saleBanner from "/Assets/saleBanner.jpg"

export default function Banner({ pathName }) {
  const getImageSrc = () => {
    switch (pathName) {
      case "/":
        return Img01;
      case "/about-us":
        return Aboutbanner;
      case "/contact-us":
        return Contactbaneer;
      case "/shop":
        return Shopbanner;
      case "/product":
        return "https://img.freepik.com/free-photo/fashion-portrait-caucasian-woman-leopard-set-top-shorts-sits-by-wooden-light-brown-door-outside-villa_343596-601.jpg?t=st=1717071622~exp=1717075222~hmac=0c10a63fb1bf281f472f3c68efa929de1f8bd13fa1980893d78ab72a6ff1f1b4&w=360";

      case "/Cartsummary":
        return  saleBanner;
        
         
     }
  };

  const handleBorderVisibility = {
    border: pathName === "/" ? "1px solid white" : "",
  };

  return (
    <div className="Banner-image">
      <img src={getImageSrc()} alt="background_image" />
      <div className="banner-01">
        {pathName === "/" && (
          <>
            <h6>Casual & Everyday</h6>
            <h1>Effortlessly blend comfort & style!</h1>
            <p>
              Effortlessly blend comfort and style with our Casual & Everyday
              collection, featuring cozy sweaters, versatile denim, laidback
              tees, and relaxed-fit joggers for your everyday adventures.
            </p>
            <NavLink className="view-collection" to="/shop" style={handleBorderVisibility}>
              View Collections
            </NavLink>
          </>
        )}
        {pathName === "/shop" && <h1>Shop</h1>}
        {pathName === "/about-us" && <h1>About</h1>}
        {pathName === "/contact-us" && <h1>Contact Us</h1>}
      </div>
    </div>
  );
}
