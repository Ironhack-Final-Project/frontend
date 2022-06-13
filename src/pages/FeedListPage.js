import axios from "axios";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/auth.context'
import "./FeedPageList.css"
import BounceLoader from "react-spinners/ClipLoader"

function FeedListPage(props) {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    const deletePost = ((element) => {
        const storedToken = localStorage.getItem('authToken')
        if (!storedToken) {
            return
        }

        axios.delete(`${process.env.REACT_APP_API_URL}/feed/${element._id}`)
            .then(() => {
                props.callbackFetch()
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
                                <img alt="" src={element.imageUrl}></img>
                            <div className="feed-middle">
                                <h2>{element.title}</h2>
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
                <div className="spinner-div">
                <BounceLoader color="#041C32" loading={loading}  size={100} className="spinner" />
                </div> :
                renderFeedList()}
            <div className="blank-space"></div>
        </div>

    )

}



export default FeedListPage;