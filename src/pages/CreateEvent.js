import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { uploadImage } from "../components/utitlityFunctions";
import { Calendar, Scheduler, useArrayState } from "@cubedoodl/react-simple-scheduler";


const CreateEvent = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [cost, setCost] = useState("");
  const [location, setLocation] = useState("");
  const [repeat, setRepeat] = useState(0);

  const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState([]);

  const navigate = useNavigate();



  const handleEventSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, description, from: new Date(from), to: new Date(to), cost, location, repeat };

    console.log(requestBody);

    axios
      .post(`${process.env.REACT_APP_API_URL}/events`, requestBody)
      .then((response) => {
        // axios.put(`${process.env.REACT_APP_API_URL}/events/pushScheduler`);
        // props.setEvents((prevEvents) => {
        //   console.log(response.data);
        //   return response.data;
        // });
        navigate("/events");
      })
      .catch((err) => {
        console.log("error creating event...", err);
      });
  };
  // const handleFileUpload = (e) => {

  //     const uploadData = new FormData();

  //     uploadData.append("imageUrl", e.target.files[0]);

  //     uploadImage(uploadData)
  //         .then(response => {
  //             console.log("response is: ", response);
  //             setImageUrl(response.fileUrl);
  //         })
  //         .catch(err => console.log("Error while uploading the file: ", err));
  // };

  return (
    <>
      <h1>Create a blog post</h1>

      <form onSubmit={handleEventSubmit}>
        <label>Title:</label>
        <input
          type="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Description:</label>
        <textarea
          type="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label>Starting:</label>
        <input
          type="datetime-local"
          name="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          min="2021-01-01T00:00"
          max="2060-06-14T00:00"
        ></input>
        <br />
        <label>Ending:</label>
        <input
          type="datetime-local"
          name="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          min="2021-01-01T00:00"
          max="2060-06-14T00:00"
        ></input>
        <br />
        <label>Price:</label>
        <input
          type="number"
          name="cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <br />
        <label>Location:</label>
        <textarea
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <label>Repeat:</label>
        <select
          name="repeat"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
        >
          <option value={0}>Once</option>
          <option value={1}>Daily</option>
          <option value={2}>Weekly</option>
          <option value={3}>Monthly</option>
          <option value={4}>Yearly</option>
        </select>
        <br />
        {/* <label>Image:</label>
                <input type="file" onChange={(e) => handleFileUpload(e)} /><br /> */}

        <button type="submit">Submit</button>
      </form>
    </>
 
   
  );
};

export default CreateEvent;
