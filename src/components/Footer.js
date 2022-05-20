import { NavLink } from "react-router-dom";
import "./Footer.css"

function Footer(){

    return(
        <div className="footer">
        <NavLink to="/aboutus"><p>About Us</p></NavLink>
        <NavLink to="/copyright"><p>Copyright</p></NavLink>
        <NavLink to="/contactus"><p>Contact Us</p></NavLink>

        </div>
    )


}

export default Footer;