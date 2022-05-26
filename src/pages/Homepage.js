import {useContext} from 'react'
import {AuthContext} from '../context/auth.context'
import bgImage from "../videos/backgroundvideo.mp4"
import "./Homepage.css"
import { NavLink } from 'react-router-dom'

const Homepage = ( () => {

    const {isLoggedIn, user, logOutUser} = useContext(AuthContext)

    return (
    <>
    <div className='homepage'>
        <video src={bgImage} autoPlay loop muted />
        <h1>Puppy Palace</h1>
        <NavLink id='book-class-btn' to="/events">Book Class</NavLink>
    </div>

        {/* {user ? <h1>Welcome back {user.username}</h1> : <h1>Puppy Palace</h1>} */}
    </>
    )
})

export default Homepage