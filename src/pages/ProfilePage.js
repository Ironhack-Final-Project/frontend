import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context'
import { uploadImage } from '../components/utitlityFunctions'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import './ProfilePage.css'

const ProfilePage = ((props) => {
    const { user } = useContext(AuthContext)
    const [name, setName] = useState("");
    const [dogs, setDogs] = useState([]);
    const [breed, setBreed] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [events, setEvents] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (user === null) {
            return
        } else {
            updateUser()
        }
    }, [user])

    const handlePostSubmit = ((e) => {
        e.preventDefault()
        const requestBody = { user, name, breed, imageUrl }

        axios.put(`${process.env.REACT_APP_API_URL}/user/${user._id}/add-dog`, requestBody)
            .then(response => {
                updateUser()


                setName('')
                setBreed('')
                setImageUrl('')
            })
            .catch(err => {
                setErrorMessage(err.response.data)
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

    const updateUser = (() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/${user._id}`)
            .then((response) => {
                setDogs(response.data.dogs)
                setEvents(response.data.eventsAttending)
            })
            .catch(err => console.log(err));
    })

    const deleteDog = ((index) => {

        axios.get(`${process.env.REACT_APP_API_URL}/user/${user._id}/delete-dog`)
            .then((response) => {
                let dogs = response.data.dogs
                const eventsAttending = response.data.eventsAttending
                dogs.splice(index, 1)
                axios.put(`${process.env.REACT_APP_API_URL}/user/${user._id}`, { dogs, eventsAttending })
                    .then(() => {
                        updateUser()
                    })
            })
            .catch(err => console.log(err))

    })

    return (
        <div className="profile-page">
            <div className="profile-page-left">
                {user ?
                    <>
                        <h3>Welcome {user.username}</h3>
                        <img src={user.imageUrl} alt={user.username} />
                        <p><strong>Account type:</strong> {user.isAdmin ? "Admin" : "Normal"}</p>
                        <p><strong>Events your attending:</strong></p>
                        <ul>

                            {events ? events.map(event => {
                                return (
                                    <>
                                        <li className='event'><NavLink to={`/events/${event._id}`}>{event.name}</NavLink></li>
                                    </>)
                            }) : ''}
                        </ul>
                    </> : ""}
            </div>

            <div className="profile-page-right">
                <h4>Your dogs:</h4>
                <div className='dogs'>

                    {dogs.length ? dogs.map((dog, index) =>
                        <div className="dog">
                            <img src={dog.imageUrl} alt={dog.name} />
                            <p><strong>Name:</strong><br /> {dog.name}</p>
                            <p><strong>Breed:</strong><br />{dog.breed}</p>
                            <a href='#' onClick={(() => deleteDog(index))}>Remove</a>
                        </div>
                    )
                        : <p>You don't have any registered dogs</p>}
                </div>

                <h4>Register a dog:</h4>
                <form onSubmit={handlePostSubmit}>
                    {errorMessage ? <p className="error-message">{errorMessage}</p> : ''}
                    <div className="dog-form">
                        <div>
                            <label><strong>Name:</strong></label>
                            <input
                                type="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            /><br />
                        </div>
                        <div>
                            <label><strong>Breed:</strong></label>
                            <input
                                type="breed"
                                name="breed"
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                            />
                            <br />
                        </div>
                        <div>
                            <label><strong>Upload Image:</strong></label>
                            <input type="file" onChange={(e) => handleFileUpload(e)} /><br />
                        </div>
                    </div>
                    <button className='submit-btn' type="submit">Register</button>
                </form>
            </div>
        </div>

    )
})


export default ProfilePage