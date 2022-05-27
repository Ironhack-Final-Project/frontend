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

    const deletePost = ((element) => {
        const storedToken = localStorage.getItem('authToken')
        if (!localStorage.getItem('authToken')) {
            return
        }

        axios.delete(`${process.env.REACT_APP_API_URL}/feed/${element._id}`)
            .then(() => {
                props.callbackFetch()
                console.log("success")
            })
            .catch(e => console.log(e))
    })

    const renderFeedList = (() => {
        return (
            <div className="posts-container">
                {props.posts.map((element) => {
                    const time = element.time.slice(0, 10)
                    return (
                        <div className="feed">
                        <div className="feed-left">
                        <img src={element.imageUrl}></img>
                        </div>
                        <div className="feed-middle"> 
                        <h2>{element.title}</h2>
                            {/* <p>{element.content.slice(0, 200) + "....."}</p> */}
                            <div className="feed-info"> 
                            <p>Posted by: {element.postedBy.username}</p> 
                            <p>Date: {time}</p>
                            </div>
                            </div>
                        <div className="feed-right">
                        <NavLink to={`/feed/${element._id}`} className="btn btn-read">Read Article</NavLink>

                            {user && user.username ? element.postedBy.username === user.username ?
                                <>
                                    <NavLink to={`/edit-post/${element._id}`} className="btn btn-edit">Edit</NavLink>
                                    
                                    <a href='#' onClick={(() => deletePost(element))} className="btn btn-delete">Delete</a>
                                </>
                                : null : null}
                        </div>
                            
                        </div>
                    )
                })}
            </div>
        )
    })


    return (
        <div className="feed-list">
            <h1>Blog</h1>
            {props.posts === null ?
                <p>loading..</p> :
                renderFeedList()}
        </div>

    )

}



export default FeedListPage;