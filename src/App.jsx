import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Shop from "./Components/Shop";
import ContactUs from "./Components/ContactUs";
import Home from "./Components/Home";
import Banner from "./Components/Banner";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Product from "./Components/Product";
import { CartProvider } from "./Components/CartContext";
import Cartsummary from "./Components/Cartsummary";
import Payment from "./Components/Payment";
 
function App() {
  return (
    <CartProvider>
      <div className="background-image">
        <Router>
          <AppContent />
        </Router>
      </div>
    </CartProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  const hide= currentPath === "/Cartsummary"||currentPath==="/payment";
  let baneerHide=currentPath==="/product/"
 
  return (
    <>
      {!hide&& <Navbar />}
      {hide||<Banner pathName={currentPath} />}
      <Routes>
        <Route path="/"  exact element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cartsummary" element={<Cartsummary />} />
        <Route path="/payment" element={<Payment />} />
       </Routes>
      {!hide && <Footer />}
    </>
  );
}

export default App;
