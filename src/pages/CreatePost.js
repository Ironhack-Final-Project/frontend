import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios  from 'axios'
import {useContext} from 'react'
import { AuthContext } from '../context/auth.context'

const CreatePost = (() => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    
    
    
    const handlePostSubmit = ((e) => {
        e.preventDefault()
        
        const storedToken = localStorage.getItem('authToken')
        console.log(user)

        const requestBody = { title, content, postedBy: user._id }

        axios.post(`${process.env.REACT_APP_API_URL}/feed`, 
        requestBody, 
        // { headers: { Authorization: `Bearer ${storedToken}`}}
        )
            .then(response => {
                navigate('/feed')

                setTitle('')
                setContent('')
            })
    })
    //// problem is setUser is

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

                <button type="submit">Sign Up</button>
            </form>
        </>
    )
})

export default CreatePost