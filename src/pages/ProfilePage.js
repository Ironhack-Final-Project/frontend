import {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../context/auth.context'
import {uploadImage} from '../components/utitlityFunctions'
import { useNavigate, NavLink } from 'react-router-dom'
import axios  from 'axios'
import './ProfilePage.css'

const ProfilePage = ( (props) => {
    const {isLoggedIn, user, logOutUser} = useContext(AuthContext)
    const [name, setName] = useState("");
    const [dogs, setDogs] = useState([]);
    const [breed, setBreed] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
        updateUser()
    }, [])
    
    const handlePostSubmit = ((e) => {
        e.preventDefault()
        
        const storedToken = localStorage.getItem('authToken')

        const requestBody = { user, name, breed, imageUrl }

        console.log(user)
        axios.put(`${process.env.REACT_APP_API_URL}/auth/user/${user._id}/add-dog`, requestBody
        // { headers: { Authorization: `Bearer ${storedToken}`}}
        )
            .then(response => {
                console.log(response)
                updateUser()
                // navigate('/feed')


                setName('')
                setBreed('')
                setImageUrl('')
            })
    })
    const handleFileUpload = (e) => {
    
        const uploadData = new FormData();

        uploadData.append("imageUrl", e.target.files[0]);
    
        uploadImage(uploadData)
            .then(response => {
                console.log("response is: ", response);
                setImageUrl(response.fileUrl);
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };

    const updateUser = (()=>{
        console.log(user)
        axios.get(`${process.env.REACT_APP_API_URL}/auth/user/${user._id}/add-dog`)
            .then((response)=>{
                console.log(response)
                setDogs(response.data.dogs)
            })
    })

    console.log(dogs)
    console.log(imageUrl)
    return (
        <div className="profile-page">
            <div className="profile-page-left">
                {user ? 
                <>
                <img src={user.imageUrl} alt={user.username}/> 
                <h3>Welcome {user.username}</h3>
                <p><strong>Account type:</strong> {user.isAdmin ? "Admin": "Normal"}</p>
                <p><strong>Events your attending:</strong></p>
                </> : ""}
                <NavLink to='/'>Edit Profile Details</NavLink>
            </div>

            <div className="profile-page-left">
                <h4>Your dogs:</h4>
                    <div className='dogs'>

                    {dogs.length ?dogs.map( dog =>
                    <div className="dog">
                        <img src={dog.imageUrl} alt={dog.name} />
                         <div className='dog-text'>
                            <p><strong>Name:</strong> {dog.name}</p> 
                            <p><strong>Breed:</strong> {dog.breed}</p> 
                        </div>
                    </div>
                    )
                    : <p>You don't have any registered dogs</p>}
                    </div>
                
                <h4>Register a dog:</h4>
                <form onSubmit={handlePostSubmit}>
                    <label><strong>Name:</strong></label><br/>
                    <input
                        type="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /><br />
                    <label><strong>Breed:</strong></label><br/>
                    <input
                        type="breed"
                        name="breed"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                    /><br />
                    <label><strong>Upload Image:</strong></label><br/>
                    <input type="file" onChange={(e) => handleFileUpload(e)} /><br />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>

    )    
})


export default ProfilePage