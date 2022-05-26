import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios  from 'axios'
import {useContext} from 'react'
import { AuthContext } from '../context/auth.context'
import {uploadImage} from '../components/utitlityFunctions'

const CreatePost = ((props) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const {feedId} = useParams()
    const [title, setTitle] = useState(undefined)
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const [postDetails, setPostDetails] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/feed/${feedId}`)
            .then( response => setPostDetails(response.data))
            .catch(err => console.log(err))
    },[])
    
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

        axios.put(`${process.env.REACT_APP_API_URL}/feed/${feedId}`, 
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
            .catch( error => {
                console.log(error)
                const errorDescription = error.response.data;
                console.log(errorDescription)
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

    return (
        <>
        <div className="create-post">
            <h1>Edit a blog post</h1>

            {errorMessage ? <p className="error-message">{errorMessage}</p>: ''}

            {title !== undefined ? (

                <form onSubmit={handleEditSubmit}>
                    <div className='flex-form'>
                        <div className="flex-col">
                            <label>Title:</label><br />
                            <input
                                type="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            /><br />

                            <label>Upload Image:</label><br />
                            <input type="file" onChange={(e) => handleFileUpload(e)} /><br />
                            <button className="submit-btn" type="submit">Submit</button>
                        </div>
                        <div className="flex-col">
                            <label>Content:</label><br />
                            <textarea
                                className='content'
                                type="content"
                                name="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            /><br />
                        </div>
                    </div>
                </form>) : "loading"}
        </div>
        </>
    )
})

export default CreatePost