import { NavLink } from 'react-router-dom'
import './navbar.css'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

const Navbar = (() => {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
    return (
        <div className="navbar">

            <div className='navbar-left'>
                <NavLink to='/'>Homepage</NavLink>
                <NavLink to='/feed'>Feed</NavLink>
                <NavLink to='/events'>Events</NavLink>
                <NavLink to='/scheduler'>Calendar</NavLink>
                <NavLink to='/dogcare'>DogCare</NavLink>
            </div>

            <div className='navbar-right'>
                {isLoggedIn ?
                    <>
                        <div className='profile-div'>
                            <img src={user.imageUrl} alt={user.username} />
                            <div class="navbar-drop">
                                <div class="dropdown">
                                    <button class="dropbtn">{user.username}
                                        <i class="fa fa-caret-down"></i>
                                    </button>
                                    <div class="dropdown-content">
                                        <NavLink to='/profile-page'>Your Profile</NavLink>
                                        {user.isAdmin ?
                                            <>
                                                <NavLink to='/overview'>Overview</NavLink>
                                                <NavLink to='/createEvent'>Create Event</NavLink>
                                                <NavLink to='/create-post'>Create Post</NavLink>
                                            </>
                                            :
                                            ''}

                                    </div>
                                </div>
                            </div>
                                        <button onClick={logOutUser}>Logout</button>
                        </div>
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