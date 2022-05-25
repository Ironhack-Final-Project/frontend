import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios  from 'axios'
import {useContext} from 'react'
import { AuthContext } from '../context/auth.context'
import {uploadImage} from '../components/utitlityFunctions'

const CreatePost = ((props) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const id = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const [postDetails, setPostDetails] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);
    console.log(props)
    
    useEffect(() => {
         setPostDetails(props.posts.find( post => post._id === id.feedId))
    },[props])
    
    useEffect(()=>{
        setTitle(postDetails.title)
        setContent(postDetails.content)
        setImageUrl(postDetails.imageUrl)
    }, [postDetails])
    
    
    
    const newDetails = {
        title,
        content,
        imageUrl
    }

    const handleEditSubmit = ((e) => {
        e.preventDefault()

        const storedToken = localStorage.getItem('authToken')

        
        // const storedToken = localStorage.getItem('authToken')

        axios.put(`${process.env.REACT_APP_API_URL}/feed/${id.feedId}`, 
        newDetails, 
        { headers: { Authorization: `Bearer ${storedToken}`}}
        )
            .then(response => {
                props.callbackFetch()
                navigate('/feed')

                setTitle('')
                setContent('')
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

    return (
        <>
            <h1>Edit a blog post</h1>

            {errorMessage ? <p className="error-message">{errorMessage}</p>: ''} 

            {title !== null ? (

            
            <form onSubmit={handleEditSubmit}>
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
                <input type="file" onChange={(e) => handleFileUpload(e)} /><br />

                <button type="submit">Submit</button>
            </form>) : "loading"}
        </>
    )
})

export default CreatePost