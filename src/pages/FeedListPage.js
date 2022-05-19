import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function FeedListPage(){

    const [feed, setFeed] = useState(null)

    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_API_URL}/feed`)
        .then(response=>{
            console.log(response.data)
            setFeed(response.data)
        })
        .catch(e=>{console.log("error getting blog list...", e)})
    },[])

    return(
        <div className="feed-list">
        <h1>Feed</h1>
        {feed.map((element) => {
            return(
            <div className="feed">
            <p>{element.title}</p>
            <p>{element.content}</p>
            <p>{element.time}</p>
            <p>{element.postedBy}</p>
            <NavLink to={`/feed/${element._id}`}>Read Article</NavLink>
            </div>
            )
        })
        }

        </div>
    )
     
    }



export default FeedListPage;