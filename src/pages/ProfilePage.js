import {useContext} from 'react'
import {AuthContext} from '../context/auth.context'

const ProfilePage = ( () => {
    const {isLoggedIn, user, logOutUser} = useContext(AuthContext)
    return (
        <div>
            {user ? 
            <>
            <img src={user.imageUrl} alt={user.username}/> 
            <h3>Welcome {user.username}</h3>
            <h4>Account type: {user.isAdmin ? "Admin": "Normal"}</h4>
            <h4>Events your attending:</h4>
            <ul>
                <li></li>
            </ul>
            </> : 'loading...'}
        </div>
    )    
})


export default ProfilePage