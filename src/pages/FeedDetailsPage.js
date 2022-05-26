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
                <div className="feed-details-columns">

                    <div className="feed-details-left">
                      <h1>{feedDetails.title}</h1>
                      <div className="post-details">
                          <p>Posted by: {feedDetails.postedBy.username}</p>
                          <p>Date: {feedDetails.time.slice(0, 10)}</p>
                      </div>
                        <p className="feed-content">{feedDetails.content}</p>
                        {feedDetails.imageUrl ? 
                        <div className="feed-image">
                        <img alt={feedDetails.title} src={feedDetails.imageUrl} />
                        </div> :
                        ""
                        // replace with stock imaae
                        }
                    </div>
                        {feedDetails.event ?
                        <div className="event-details-right">
                        <h2 style={{"text-align": 'center'}}>Join us for an Event!</h2>
                            <h3>{feedDetails.event.name}</h3>
                            <p>Cost: €{feedDetails.event.cost}</p>
                            <p>Location: {feedDetails.event.location}</p>
                            <NavLink style={{"font-size": 1.2 + "rem"}} to={`/events/${feedDetails.event._id}`}>Click here for more details</NavLink>
                        </div> : ''
                        }
                    <div className="feed-details-right">
                    </div>
                </div>

            </div>
    }
</>
)

}

export default FeedDetailsPage;