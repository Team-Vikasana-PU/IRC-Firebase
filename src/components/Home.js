import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar'

import { auth, db, teams_collection, storage } from '../firebase'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";

const Home = () => {

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
        else {
          setData()
        }
        setUser(user)
             
      }
      else {
        setUser()
      }
      setLoading(false)
    })
    
  }, [])

  return (
    <>
    <Navbar />
    <div className='index-bg h-screen'>
      <div className='w-screen relative h-screen px-16 flex items-center md:items-start justify-center flex-col'>
        <h2 className='text-3xl md:text-6xl font-monument font-bold mb-2'>CHANGING THE</h2>
        <h2 className='text-3xl md:text-6xl font-monument font-bold'>WAY YOU <span className='text-pink-600'>INNOVATE</span></h2>

        <h3 className='text-lg md:text-2xl text-white/70 text-center md:text-left w-full md:w-1/2 mt-10'>Join us at an incredible event! Explore, participate and learn more about the most Extreme and Unique Space Rover project competition</h3>

        {
            user ? 
              data ?
                <div className='flex items-center'>
                  <button onClick={() => navigate('/profile')} className='text-xl bg-gradientBlue active:bg-blue-500 border-2 border-solid border-white py-1 px-8 rounded-lg mr-5 mt-10'>PROFILE</button>
                  
                </div>
                :
                <div className='flex items-center'>
                  <button onClick={() => navigate('/register')} className='text-xl bg-gradientBlue active:bg-blue-500 border-2 border-solid border-white py-1 px-8 rounded-lg mr-5 mt-5'>REGISTER</button>
                  
                </div>
              :
              <button onClick={() => navigate('/login')} className='text-xl bg-gradientBlue active:bg-blue-500 border-2 border-solid border-white py-1 px-5 rounded-lg mt-5'>PARTICIPANT LOGIN</button>
          }

        <h3 className='absolute hidden md:block bottom-5 left-5 font-tele text-white/80'>International Rover<br></br>Challenge 2023</h3>
        <h3 className='absolute hidden md:block bottom-5 right-5 font-tele text-white/80'>Presidency University,<br></br>Bangalore</h3>

        <h3 className='absolute block md:hidden bottom-5 left-5 font-tele text-sm text-white/60'>International Rover<br></br>Challenge 2023<br></br>Presidency University,<br></br>Bangalore</h3>
      </div>
      

    </div>
    </>
  )
}

export default Home