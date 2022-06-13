import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import IsPrivate from "./components/IsPrivate";

import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import EventListPage from "./pages/EventListPage";
import FeedListPage from "./pages/FeedListPage";
import FeedDetailsPage from "./pages/FeedDetailsPage";
import LoginPage from "./pages/LoginPage";
import CreatePost from "./pages/CreatePost";
import ContactUs from "./pages/ContactUs";
import Copyright from "./pages/Copyright";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import EditPost from "./pages/EditPost";
import Calender from "./pages/Scheduler";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import DogCare from "./pages/Dogcare";
import OverviewDogcare from "./pages/OverviewDogcare";



function App() {
  const [posts, setPosts] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [selected, setSelected] = useState(new Date());
 

  useEffect(() => {
    fetchPosts();
    fetchEvents();
  }, []);



  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/feed`)
      .then((response) => {
        setPosts(response.data);
      })

      .catch((e) => console.log("error getting projects from API...", e));
  };

  const fetchEvents = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events`)
      .then((response) => {
        setAllEvents(response.data);
        return response.data;
      })
      .catch((e) => console.log("error getting projects from API...", e));
  };

  return (
    <div className="App">
      {/* ///Navbar/// */}
      <div className="routes-navbar-container">
      <Navbar />

      <Routes>
        {/* ///Auth/// */}
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ///Main Pages/// */}
        <Route path="/profile-page" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route
          path="/events"
          element={
            <EventListPage allEvents={allEvents} fetchEvents={fetchEvents} />
          }
        />
        <Route
          path="/feed"
          element={<FeedListPage callbackFetch={fetchPosts} posts={posts} />}
        />
        <Route path="/feed/:feedId" element={<FeedDetailsPage />} />
        <Route
          path="/create-post"
          element={<IsPrivate>
            <CreatePost allEvents={allEvents} callbackFetch={fetchPosts} />
            </IsPrivate>}
        />
        <Route
          path="/edit-post/:feedId"
          element={<IsPrivate><EditPost posts={posts} callbackFetch={fetchPosts} /></IsPrivate>}
        />
        <Route
          path="/scheduler"
          element={
            <Calender
              events={allEvents}
              fetchEvents={fetchEvents}
              selected={selected}
              setSelected={setSelected}
            />
          }
        />
        <Route path="/dogcare" element={<IsPrivate><DogCare /></IsPrivate>} />
        <Route path="/createEvent" element={<IsPrivate><CreateEvent /></IsPrivate>} />
        <Route path="/events/:eventId" element={<EventDetails fetchEvents={fetchEvents}/>} />

        {/* ///Footer Pages/// */}
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/copyright" element={<Copyright />} />
        
        <Route path="/contactus" element={<ContactUs />} />
        
        <Route path="/overview" element={<IsPrivate><OverviewDogcare selected={selected}
              setSelected={setSelected}></OverviewDogcare></IsPrivate>} />
        
      </Routes>

      </div>
      <Footer />
    </div>
  );
}

export default App;
