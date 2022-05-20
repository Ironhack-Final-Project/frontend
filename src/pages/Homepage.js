import {useContext} from 'react'
import {AuthContext} from '../context/auth.context'

const Homepage = ( () => {

    const {isLoggedIn, user, logOutUser} = useContext(AuthContext)

    return (
    <>
        {user ? <h1>Welcome back {user.username}</h1> : <h1>Puppy Palace</h1>}
    </>
    )
})

export default Homepage