
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Accommodation from './components/Accommodation';
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
      </Routes>
      </div>
    
  );
}

export default App;
