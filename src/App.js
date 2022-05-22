import './App.css';
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from "react";

import SignUpPage from './pages/SignUpPage';
import EventListPage from './pages/EventListPage';
import FeedListPage from './pages/FeedListPage';
import FeedDetailsPage from './pages/FeedDetailsPage';
import LoginPage from "./pages/LoginPage"
import CreatePost from './pages/CreatePost';
import ContactUs from './pages/ContactUs';
import Copyright from './pages/Copyright';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import Homepage from "./pages/Homepage"
import EditPost from './pages/EditPost'


function App() {
  const [posts, setPosts] = useState(null);
  const [events, setEvents] =useState(null)

  useEffect(() => {
    fetchPosts()
    fetchEvents()
  }, []);

  const fetchPosts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/feed`)
      .then( response => {
        setPosts(response.data);
      })
      .catch( e => console.log("error getting projects from API...", e))
  }

  const fetchEvents = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/events`)
      .then( response => {
        setEvents(response.data);
      })
      .catch( e => console.log("error getting projects from API...", e))
  }
  
  return (
    <div className="App">

    {/* ///Navbar/// */}
      <Navbar />

      <Routes>

      {/* ///Auth/// */}
        <Route path='/' element={<Homepage  />} />
        <Route path='/register' element={<SignUpPage  />} />
        <Route path='/login' element={<LoginPage  />} />

      {/* ///Main Pages/// */}
        <Route path='/events' element={<EventListPage />} />
        <Route path='/feed' element={<FeedListPage callbackFetch={fetchPosts} posts={posts}/>} />
        <Route path='/feed/:feedId' element={<FeedDetailsPage />} />
        <Route path='/createPost' element={<CreatePost events={events} callbackFetch={fetchPosts}/>} />
        <Route path='/edit-post/:feedId' element={<EditPost posts={posts} callbackFetch={fetchPosts}/>} />

      {/* ///Footer Pages/// */}
      <Route path="/aboutus" element={<AboutUs />}/>
      <Route path="/copyright" element={<Copyright />}/>
      <Route path="/contactus" element={<ContactUs />}/>

      </Routes>

      {/* ///Footer/// */}
    <Footer/>

    </div>
  );
}

export default App;
