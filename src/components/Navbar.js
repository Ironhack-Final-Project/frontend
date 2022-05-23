import { NavLink } from 'react-router-dom'
import './navbar.css'
import {useContext} from 'react'
import {AuthContext} from '../context/auth.context'

const Navbar = ( () => {

    const {isLoggedIn, user, logOutUser} = useContext(AuthContext)
    return(
        <div className="navbar">

            <div className='navbar-left'>
                <NavLink to='/'>Homepage</NavLink> 
                <NavLink to='/feed'>Feed</NavLink> 
                <NavLink to='/events'>Events</NavLink> 
            </div>

            <div className='navbar-right'>
                {isLoggedIn ?
                <>  
                    {user.isAdmin ?
                    <>
                    <NavLink to='/'>Create Event</NavLink> 
                    <NavLink to='/createPost'>Create Post</NavLink> 
                    </> 
                    :
                    ''}
                    <div className='profile-div'>
                        <img src={user.imageUrl} alt={user.username}/> 
                        <NavLink to='/profile-page'>Your Profile</NavLink> 
                    </div>
                    <button onClick={logOutUser}>Logout</button> 
                </> 
                : 
                <>
                    <NavLink to='/register'>Register</NavLink> 
                    <NavLink to='/login'>Login</NavLink> 
                </>
                }
            </div>
            
            
        </div>
    )
})


export default Navbar