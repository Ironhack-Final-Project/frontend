import { useParams } from "react-router-dom";
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
{feedDetails === null?
<p>loading..</p>:
<div className="feed-details">
<h1>{feedDetails.title}</h1>
<div>
<p className="feed-content">{feedDetails.content}</p>
</div>
<p>Date: {feedDetails.time.slice(0,10)}</p>
<p>Posted by: {feedDetails.postedBy}</p>

</div>
    }
    </>
)

}

export default FeedDetailsPage;