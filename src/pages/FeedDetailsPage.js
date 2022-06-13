import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./FeedDetails.css";
import BounceLoader from "react-spinners/ClipLoader"

function FeedDetailsPage(props) {
    const { feedId } = useParams()
    const [feedDetails, setFeedDetails] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/feed/${feedId}`)
            .then(response => {
                return setFeedDetails(response.data)
            })
            .catch(e => { console.log("error getting blog list...", e) })
    }, [])

    return (
        <>
            {feedDetails === null ?
                <div className="spinner-div">
                <BounceLoader color="#041C32" loading={loading}  size={100} className="spinner" />
                </div> :
                <div className="feed-details">
                    <div className="feed-details-columns">
                    <h1>{feedDetails.title}</h1>
                     {feedDetails.imageUrl ?
                                <div className="feed-image">
                                    <img alt={feedDetails.title} src={feedDetails.imageUrl} />
                                </div> :
                                ""}
                        <div className="feed-details-left">
                            <p className="feed-content">{feedDetails.content}</p>
                            <div className="post-details">
                                <p>Posted by: {feedDetails.postedBy.username}</p>
                                <p>Date: {feedDetails.time.slice(0, 10)}</p>
                            </div>
                           
                        </div>
                        {feedDetails.event ?
                            <div className="feed-details-right">
                                <h2 style={{ "text-align": 'center' }}>Join our Event!</h2>
                                <h3>{feedDetails.event.name}</h3>
                                <p>Cost: €{feedDetails.event.cost}</p>
                                <p>Location: {feedDetails.event.location}</p>
                                <h6 className="feed-details-btn"><NavLink  style={{ "font-size": 1 + "rem" }} to={`/events/${feedDetails.event._id}`}>More Details</NavLink></h6> 
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