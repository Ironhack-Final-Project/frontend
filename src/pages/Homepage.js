import bgImage from "../videos/backgroundvideo.mp4"
import "./Homepage.css"
import { NavLink } from 'react-router-dom'

const Homepage = (() => {

    return (
        <>
            <div className='homepage'>
                <video src={bgImage} autoPlay loop muted />
                <h1>Puppy Palace</h1>
                <NavLink id='book-class-btn' to="/events">Book Class</NavLink>
            </div>
        </>
    )
})

export default Homepage