import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/register' element={<SignUpPage  />} />
        {/* <Route path='/login' element={<LoginPage  />} /> */}
      </Routes>
    </div>
  );
}

export default App;
