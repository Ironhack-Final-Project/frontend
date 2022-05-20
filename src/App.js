import './App.css';
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import EventListPage from './pages/EventListPage';
import FeedListPage from './pages/FeedListPage';
import FeedDetailsPage from './pages/FeedDetailsPage';
import LoginPage from "./pages/LoginPage"
import Homepage from './pages/Homepage'
import CreatePost from './pages/CreatePost';

function App() {
  
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={<Homepage  />} />
        <Route path='/register' element={<SignUpPage  />} />
        <Route path='/login' element={<LoginPage  />} />

        <Route path='/events' element={<EventListPage />} />
        <Route path='/feed' element={<FeedListPage />} />
        <Route path='/feed/:feedId' element={<FeedDetailsPage />} />
        <Route path='/createPost' element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
