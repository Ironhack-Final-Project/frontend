import { NavLink } from 'react-router-dom'
import './navbar.css'

const Navbar = ( () => {
    return(
        <div className="navbar">
            <div className='navbar-left'>
                <NavLink to='/'>Homepage</NavLink> 
                <NavLink to='/'>Homepage</NavLink> 
                <NavLink to='/'>Homepage</NavLink> 
            </div>
            <div className='navbar-right'>
                <NavLink to='/register'>Register</NavLink> 
                <NavLink to='/login'>Login</NavLink> 
            </div>
            
        </div>
    )
})


export default Navbar