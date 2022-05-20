import './App.css';
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import EventListPage from './pages/EventListPage';
import FeedListPage from './pages/FeedListPage';
import FeedDetailsPage from './pages/FeedDetailsPage';
import LoginPage from "./pages/LoginPage"
import ContactUs from './pages/ContactUs';
import Copyright from './pages/Copyright';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import Homepage from "./pages/Homepage"

function App() {
  
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
        <Route path='/feed' element={<FeedListPage />} />
        <Route path='/feed/:feedId' element={<FeedDetailsPage />} />

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
