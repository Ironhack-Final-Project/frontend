import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/auth.context'
import "./FeedPageList.css"
import { Modal, Button } from 'react'

function FeedListPage(props) {

    const [feed, setFeed] = useState(null)
    const [username, setUsername] = useState('guest')
    const { user } = useContext(AuthContext)

    const deletePost = ((id) => {
        if (!localStorage.getItem('authToken')) {
            return
        }

        axios.delete(`${process.env.REACT_APP_API_URL}/feed/${id}`)
            .then(() => {
                props.callbackFetch()
                console.log("success")
            })
            .catch(e => console.log(e))
    })

    const renderFeedList = (() => {
        return (
            <>
                {props.posts.map((element) => {
                    const time = element.time.slice(0, 10)
                    return (
                        <div className="feed">
                            <h2>{element.title}</h2>
                            <p>{element.content.slice(0, 200) + "....."}</p>
                            <p>Date: {time}</p>
                            <p>Posted by: {element.postedBy.username}</p>
                            <NavLink to={`/feed/${element._id}`}>Read Article</NavLink><br />

                            {user && user.username ? element.postedBy.username === user.username ?
                                <>
                                    <NavLink to={`/edit-post/${element._id}`}>Edit</NavLink>
                                    <a href='#' onClick={(() => deletePost(element._id))}>Delete</a>
                                </>
                                : '' : ''}
                        </div>
                    )
                })}
            </>
        )
    })


    return (
        <div className="feed-list">
            <h1>Feed</h1>
            {props.posts === null ?
                <p>loading..</p> :
                renderFeedList()}
        </div>

    )

}



export default FeedListPage;