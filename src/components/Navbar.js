import React, { useState, useEffect } from 'react'
import {useNavigate, NavLink} from 'react-router-dom'

import { auth, db, teams_collection, storage } from '../firebase'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";


import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import Grow from '@mui/material/Grow';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const [showMobile, setShowMobile] = useState(false)

  const navigate = useNavigate()

  const [user, setUser] = useState()
  const [data, setData] = useState()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user) {
        const docRef = doc(db, "participants", user.uid);

        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
          //navigate('/register')
          let docData = docSnap.data()
          setData(docData)
        }
        setUser(user)       

      }
      setLoading(false)
      
    })
    
  }, [])

  if(loading) return null

  return (
    <nav className='flex fixed w-screen bg-black/70 md:bg-transparent flex-col md:flex-row justify-between items-center z-50'>
      <div className='flex w-full justify-between items-center px-8 py-6'>
        <div>
          <h1 onClick={() => navigate('/')} className='text-3xl flex font-monument cursor-pointer'>Vikasana</h1>
        </div>
          

        <div className='hidden md:block'>
          <ul className='flex font-tele'>
            <NavLink onClick={() => navigate('#')} className='mx-4 cursor-pointer hover:underline decoration-gradientBlue underline-offset-8 decoration-2'>About</NavLink>
            <li onClick={() => navigate('#')} className='mx-4 cursor-pointer hover:underline decoration-gradientBlue underline-offset-8 decoration-2'>Contact us</li>
            <li onClick={() => navigate('#')} className='mx-4 cursor-pointer hover:underline decoration-gradientBlue underline-offset-8 decoration-2'>College Map</li>
            <NavLink to="/accommodation" style={({ isActive }) =>
              isActive ? {textDecoration:'underline', textDecorationColor:'#FE23A8', textUnderlineOffset: '8px', textDecorationThickness: '2px'} : undefined
            } className='mx-4 cursor-pointer hover:underline decoration-gradientBlue underline-offset-8 decoration-2'>Accommodation</NavLink>
            
          </ul>
        </div>

        <div className='hidden md:block'>
          {
            user ? 
              data ?
                <div className='flex items-center'>
                  <button onClick={() => navigate('/profile')} className='text-xl bg-gradientBlue active:bg-blue-500 border-2 border-solid border-white py-1 px-4 rounded-lg mr-5'>PROFILE</button>
                  <button onClick={async () => {
                    auth.signOut()
                    setUser()
                    setData()
                    navigate('/')
                  }} className='text-xl bg-red-600 active:bg-red-500 border-2 border-solid border-white py-1 px-4 rounded-lg mr-5'>LOGOUT</button>
                </div>
                :
                <div className='flex items-center'>
                  <button onClick={() => navigate('/register')} className='text-xl bg-gradientBlue active:bg-blue-500 border-2 border-solid border-white py-1 px-4 rounded-lg mr-5'>REGISTER</button>
                  <button onClick={async () => {
                    auth.signOut()
                    setUser()
                    setData()
                    navigate('/')
                  }} className='text-xl bg-red-600 active:bg-red-500 border-2 border-solid border-white py-1 px-4 rounded-lg mr-5'>LOGOUT</button>
                </div>
              :
              <button onClick={() => navigate('/login')} className='text-xl bg-gradientBlue active:bg-blue-500 border-2 border-solid border-white py-1 px-3 rounded-lg'>PARTICIPANT LOGIN</button>
          }
        </div>
          
        <div className='block md:hidden'>
          <MenuIcon onClick={() => setShowMobile(!showMobile)} fontSize="large" />
        </div>
      </div>

      <Collapse timeout={1000} style={{height: '100vh', width:'100vw', display: showMobile? 'block' : 'none'}} in={showMobile}>
        <div className={`mobile-menu bg-black/70 backdrop-blur-sm h-screen w-full`}>
          <div className=' w-full justify-center items-center'>
            <ul className='flex flex-col items-center font-tele'>
              <li className='py-5 text-xl'>About</li>
              <li className='py-5 text-xl'>Contact us</li>
              <li className='py-5 text-xl'>College Map</li>
              <li onClick={() => navigate('/accommodation')} className='py-5 text-xl'>Accommodation</li>
              
              <li className='py-5 text-xl'>
              {
                user ? 
                  data ?
                    <div className='flex items-center'>
                      <button onClick={() => navigate('/profile')} className='text-xl bg-gradientBlue border-2 border-solid border-white py-1 px-4 rounded-lg mr-3'>PROFILE</button>
                      <LogoutIcon onClick={async () => {
                        await signOut(auth)
                        navigate('/')
                      }} fontSize='large' className='text-red-600' />
                    </div>
                    :
                    <div className='flex items-center'>
                      <button onClick={() => navigate('/register')} className='text-xl bg-gradientBlue border-2 border-solid border-white py-1 px-4 rounded-lg mr-3'>REGISTER</button>
                      <LogoutIcon onClick={async () => {
                        await signOut(auth)
                        navigate('/')
                      }} fontSize='large' className='text-red-600' />
                    </div>
                  :
                  <button onClick={() => navigate('/login')} className='text-xl bg-gradientBlue border-2 border-solid border-white py-1 px-3 rounded-lg'>PARTICIPANT LOGIN</button>
              }
              </li>

              
              
            </ul>
          </div>
        </div>
      </Collapse>

      

    </nav>
  )
}

export default Navbar