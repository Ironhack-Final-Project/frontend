import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./FeedDetails.css"

function FeedDetailsPage(props){
    const { feedId } = useParams()
    const [feedDetails, setFeedDetails] = useState(null)

    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_API_URL}/feed/${feedId}`)
        .then(response=>{
            console.log(response.data)
           return setFeedDetails(response.data)
        })
        .catch(e=>{console.log("error getting blog list...", e)})
    },[])

return(
<>
        {feedDetails === null ?
            <p>loading..</p> :
            <div className="feed-details">
                <h1>{feedDetails.title}</h1>
                <div className="post-details">
                    <p>Posted by: {feedDetails.postedBy.username}</p>
                    <p>Date: {feedDetails.time.slice(0, 10)}</p>
                </div>
                <div className="feed-details-columns">

                    <div className="feed-details-left">
                        <p className="feed-content">{feedDetails.content}</p>
                    </div>
                    <div className="feed-details-right">
                        {feedDetails.imageUrl ? 
                        <img alt={feedDetails.title} src={feedDetails.imageUrl} /> :
                        ""
                        // replace with stock imaae
                    }
                        {feedDetails.event ?
                        <div className="feed-event-details">
                            <h3>{feedDetails.event.title}</h3>
                            <p>Cost: €{feedDetails.event.cost}</p>
                            <p>Location: {feedDetails.event.location}</p>
                            <NavLink to="#">Click here for more details</NavLink>
                        </div> : ''
                        }
                    </div>
                </div>

            </div>
    }
</>
)

}

export default FeedDetailsPage;