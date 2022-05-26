import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { uploadImage } from "../components/utitlityFunctions";
import { Calendar, Scheduler, useArrayState } from "@cubedoodl/react-simple-scheduler";
import './CreateEvent.css'


const CreateEvent = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [cost, setCost] = useState("");
  const [location, setLocation] = useState("");
  const [repeat, setRepeat] = useState(0);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState([]);

  const navigate = useNavigate();



  const handleEventSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem('authToken')

    const requestBody = { name, description, from: new Date(from), to: new Date(to), cost, location, repeat };


    axios
      .post(`${process.env.REACT_APP_API_URL}/events`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // axios.put(`${process.env.REACT_APP_API_URL}/events/pushScheduler`);
        // props.setEvents((prevEvents) => {
        //   console.log(response.data);
        //   return response.data;
        // });
        navigate("/events");
      })
      .catch((error) => {
        console.log(error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
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
      <div className="create-event">
        <h1>Create an event</h1>

        {errorMessage ? <p className="error-message">{errorMessage}</p> : ''}

        <form onSubmit={handleEventSubmit}>
          <div className="flex-form">
            <div className="flex-col">
              <label>Title:</label>
              <br />
              <input
                type="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <br />
              <label>Price:</label>
              <br />
              <input
                type="number"
                name="cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
              <br />
              <label>Location:</label>
              <br />
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <br />
              <label>Repeat:</label>
              <br />
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
            </div>
            <div className="flex-col">
              <label>Description:</label>
              <br />
              <textarea
                className="description"
                type="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <label>Starting:</label>
              <br />
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
              <br />
              <input
                type="datetime-local"
                name="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                min="2021-01-01T00:00"
                max="2060-06-14T00:00"
              ></input><br/>
              <button className="submit-btn" type="submit">Submit</button>
            </div>
          </div>
          <br />
          {/* <label>Image:</label>
                <input type="file" onChange={(e) => handleFileUpload(e)} /><br /> */}

        </form>
      </div>
    </>


  );
};

export default CreateEvent;
