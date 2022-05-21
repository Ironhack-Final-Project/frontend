import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios  from 'axios'
import {useContext} from 'react'
import { AuthContext } from '../context/auth.context'

const CreatePost = ((props) => {
    console.log(props)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    
    const id = useParams()
    console.log(id)

    console.log(props.posts)
    const postDetails = props.posts.find( post => post._id === id.feedId)
    
    
    const [title, setTitle] = useState(postDetails.title)
    const [content, setContent] = useState(postDetails.content)


    const newDetails = {
        title,
        content
    }

    const handleEditSubmit = ((e) => {
        e.preventDefault()
        
        // const storedToken = localStorage.getItem('authToken')

        axios.put(`${process.env.REACT_APP_API_URL}/feed/${id.feedId}`, 
        newDetails, 
        // { headers: { Authorization: `Bearer ${storedToken}`}}
        )
            .then(response => {
                props.callbackFetch()
                navigate('/feed')

                setTitle('')
                setContent('')
            })
    })
    //// problem is setUser is

    return (
        <>
            <h1>Edit a blog post</h1>
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

                <button type="submit">Submit</button>
            </form>) : "loading"}
        </>
    )
})

export default CreatePost