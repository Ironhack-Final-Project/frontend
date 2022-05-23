import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios  from 'axios'
import {useContext} from 'react'
import { AuthContext } from '../context/auth.context'
import {uploadImage} from '../components/utitlityFunctions'

const CreatePost = ((props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState("");
    const [event, setEvent] = useState("");
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    
    
    const handlePostSubmit = ((e) => {
        e.preventDefault()
        
        const storedToken = localStorage.getItem('authToken')

        const requestBody = { title, content, postedBy: user._id, event, imageUrl }

        

        axios.post(`${process.env.REACT_APP_API_URL}/feed`, 
        requestBody, 
        // { headers: { Authorization: `Bearer ${storedToken}`}}
        )
            .then(response => {
                props.callbackFetch()
                navigate('/feed')


                setTitle('')
                setContent('')
                setImageUrl('')
                setEvent('')
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
        <>
            <h1>Create a blog post</h1>

            <form onSubmit={handlePostSubmit}>
                <label>Post Title:</label>
                <input
                    type="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br />
                <label>Post Content:</label>
                <textarea
                    type="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                /><br />

                <label>Link an event:</label>
                <select 
                    name="event" 
                    id="event"
                    defaultValue=''
                    onChange={({ target: { value } }) => setEvent(value)}
                    >
                    <>
                    <option value=''>None</option>
                    {props.events ? props.events.map((event) => {
                        return (<option
                             value={event._id}>{event.title}</option>)
                    }) : ''}
                    </>
                </select>



                <label>Upload Image:</label>
                <input type="file" onChange={(e) => handleFileUpload(e)} /><br />

                <button type="submit">Submit</button>
            </form>
        </>
    )
})

export default CreatePost