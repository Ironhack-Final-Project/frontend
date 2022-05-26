import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios  from 'axios'
import {useContext} from 'react'
import { AuthContext } from '../context/auth.context'
import {uploadImage} from '../components/utitlityFunctions'
import "./CreatePost.css"

const CreatePost = ((props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState("");
    const [event, setEvent] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const storedToken = localStorage.getItem('authToken') // is necessary?


    console.log(props)
    
    
    const handlePostSubmit = ((e) => {
        e.preventDefault()
        
        const storedToken = localStorage.getItem('authToken')

        const requestBody = { title, content, postedBy: user._id, event, imageUrl }
        

        axios.post(`${process.env.REACT_APP_API_URL}/feed`, 
        requestBody, 
        { headers: { Authorization: `Bearer ${storedToken}`}}
        )
            .then(response => {
                props.callbackFetch()
                navigate('/feed')


                setTitle('')
                setContent('')
                setImageUrl('')
                setEvent('')
            })
            .catch((error) => {
                const errorDescription = error.response.data;
                setErrorMessage(errorDescription);
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

    console.log(event)

    return (
        <div className="create-post">
            <h1>Create a blog post</h1>

            {errorMessage ? <p className="error-message">{errorMessage}</p>: ''}

            <form onSubmit={handlePostSubmit}>
            <div className='flex-form'>
            <div className="flex-col">
                <label>Post Title:</label><br/>
                <input
                    type="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br />

                <label>Link an event:</label><br/>
                <select 
                    name="event" 
                    id="event"
                    defaultValue=''
                    onChange={({ target: { value } }) => setEvent(value)}
                    >
                    <>
                    <option value=''>None</option>
                    {props.allEvents ? props.allEvents.map((event) => {
                        return (<option
                            value={event._id}>{event.name}</option>)
                    }) : ''}
                    </>
                </select><br/>



                <label>Upload Image:</label><br/>
                <input type="file" onChange={(e) => handleFileUpload(e)} /><br />
                </div>
                <div className="flex-col">
                    <label>Post Content:</label><br/>
                    <textarea
                        type="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        /><br />
                    </div>
                    </div>
                <button className="submit-btn"type="submit">Submit</button>
            </form>
        </div>
    )
})

export default CreatePost