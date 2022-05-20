import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./FeedPageList.css"

function FeedListPage(){

    const [feed, setFeed] = useState(null)

    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_API_URL}/feed`)
        .then(response=>{
            console.log(response.data)
           return setFeed(response.data)
        })
        .catch(e=>{console.log("error getting blog list...", e)})
    },[])

    return(
        <div className="feed-list">
        <h1>Feed</h1>
        {feed===null?
        <p>loading..</p>:
        feed.map((element) => {
            const time = element.time.slice(0,10)
            return(
            <div className="feed">
            <h2>{element.title}</h2>
            <p>{element.content.slice(0, 200)+"....."}</p>
            <p>Date: {time}</p>
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