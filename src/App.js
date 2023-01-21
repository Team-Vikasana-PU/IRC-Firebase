
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Accommodation from './components/Accommodation';
import Map from './components/Map';
import User from './components/User';
import About from './components/About';
import Contact from './components/Contact';
import { Routes, Route } from 'react-router-dom';
import './App.css';


function App() {

  return (
      <div className='bg-background text-stone-50'>
      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/accommodation' element={<Accommodation />} />
        <Route path='/map' element={<Map />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/user/:user_uid' element={<User />} />
      </Routes>
      </div>
    
  );
}

export default App;
