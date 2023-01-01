import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar'

import { auth, db, teams_collection, storage } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';

const Profile = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user) {
        const docRef = doc(db, "participants", user.uid);

        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()) {
          navigate('/register')
        }

        let docData = docSnap.data()
        setUser(user)
        setData(docData)
        setLoading(false)

      }
      else {
        navigate('/login')
      } 
      
    })
    
  }, [])

  if(loading) {
    return null
  }

  return (
    <>
        <Navbar />
        <div className='w-screen min-h-screen bg-background pt-32 profile-container'>
        
          <div className='flex w-full justify-around items-center'>
            <div className=''>
              <Avatar sx={{width: 200, height: 200}} src={data?.avatar} />
            </div>

            <div className='verification-container flex flex-col items-center font-circular'>
              <h3 className='text-white/80'>Verification Status</h3>
              <div className={`w-40 h-40 rounded-full ${data?.verified ? 'bg-green-500' :'bg-red-600'} mt-5`}></div>
              <h3 className='text-white mt-5'>{data?.verified ? 'Verified' : 'Not Verified'}</h3>
            </div>

            <div className='qr-container'>
              <img className='w-48 h-48' src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" />
            </div>
            
          </div>

          <div className='flex flex-wrap w-full justify-around mt-10'>
            <div className='w-1/2 flex justify-center'>
              <TextField
                
                className="!mt-8 w-2/3" 
                id="standard-basic" 
                label="First Name" 
                
                variant="filled"
                defaultValue={data?.first_name}
                ///value={data?.first_name}
                
                />
            </div>
            
            <div className='w-1/2 flex justify-center'>
              <TextField
                
                className="!mt-8 w-2/3" 
                id="standard-basic" 
                label="Last Name" 
                
                variant="filled"
                defaultValue={data?.last_name}
                ///value={data?.first_name}
                
                />
            </div>
            
            <div className='w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-2/3" 
                id="standard-basic" 
                label="Email"
                type='email' 
                variant="filled"
                defaultValue={data?.email}
                ///value={data?.first_name}
                
                />
            </div>
            
            <div className='w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-2/3" 
                id="standard-basic" 
                label="Mobile"
                 
                variant="filled"
                defaultValue={data?.mobile}
                ///value={data?.first_name}
                
                />
            </div>
            
            <div className='w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-2/3" 
                id="standard-basic" 
                label="Team Name"
                 
                variant="filled"
                defaultValue={data?.team}
                ///value={data?.first_name}
                
                />
            </div>
            
            <div className='w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-2/3" 
                id="standard-basic" 
                label="University Name"
                 
                variant="filled"
                defaultValue={data?.university}
                ///value={data?.first_name}
                
                />
            </div>
            

          </div>

        </div>
    </>
  )
}

export default Profile