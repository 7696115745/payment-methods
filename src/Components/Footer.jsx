import { NavLink } from "react-router-dom"
export default function Footer() {
  return (
    <>
    <footer>
        <div className="wrapper">
<div className="footer-parent">
<div className="footer-menus">
    <h3>Menu</h3>
   <ul>
    <li>
        <NavLink className="footer-links" to="/">Home</NavLink>
    </li>
    <li>
        <NavLink className="footer-links" to="/shop">Shop</NavLink>
    </li>
    <li>
        <NavLink className="footer-links" to="about-us">About us </NavLink>
    </li>
    <li>
        <NavLink className="footer-links" to="contact-us">Contact us</NavLink>
    </li>
   </ul> 
</div>
<div className="footer-menus">
    <h3>Categories</h3>
   <ul>
    <li>
        <NavLink className="footer-links">Casual</NavLink>
    </li>
    <li>
        <NavLink className="footer-links">Work & Office</NavLink>
    </li>
    <li>
        <NavLink className="footer-links">Activewear</NavLink>
    </li>
    <li>
        <NavLink className="footer-links">Evening Dresses</NavLink>
    </li>
   </ul> 
</div>
<div className="footer-menus">
    <h3>Resources</h3>
   <ul>
    <li>
        <NavLink className="footer-links">Contact Support</NavLink>
    </li>
    <li>
        <NavLink className="footer-links">Faq</NavLink>
    </li>
    <li>
        <NavLink className="footer-links">Live Chat</NavLink>
    </li>
    <li>
        <NavLink className="footer-links">Returns</NavLink>
    </li>
   </ul> 
</div>
<div className="footer-menus">
    <h3>Social Media</h3>
   <ul>
    <li>
        <NavLink className="footer-links">Facebook</NavLink>
    </li>
    <li>
        <NavLink className="footer-links">Twitter</NavLink>
    </li>
    <li>
        <NavLink className="footer-links">Instagram</NavLink>
    </li>
    <li>
        <NavLink className="footer-links">Pinterest</NavLink>
    </li>
   </ul> 
</div>

</div>

</div>


    </footer>
    
    
    </>

)
}
