import React, {useState, useEffect} from 'react'
import QRCode from "react-qr-code";
import { QRious } from 'react-qrious'
import { useQrious } from 'react-qrious'
import {useNavigate, useParams} from 'react-router-dom'
import Navbar from './Navbar'

import { auth, db, teams_collection, storage } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocs, setDoc, updateDoc  } from "firebase/firestore";

import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';

const User = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  const { user_uid } = useParams();

  const getUserProfile = async () => {
    
    if(!user_uid) return
    
    const docRef = doc(db, "participants", user_uid);

    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()) {
        navigate('/')
    }

    let docData = docSnap.data()

    setData(docData)
    
    setLoading(false)
  }

  useEffect(() => {
    
    getUserProfile()    
  }, [])
  
  

  if(loading) return null


  return (
    <>
        <Navbar />
        <div className='w-full min-h-screen bg-background py-32 profile-container'>
        
          <div className='flex flex-col md:flex-row w-full justify-around items-center'>
            <div className=''>
              <Avatar sx={{width: 200, height: 200}} src={data?.avatar} />
            </div>

            <div className='verification-container flex flex-col items-center font-circular mt-10 md:mt-0'>
              <h3 className='text-white/80'>Verification Status</h3>
              <div className={`w-40 h-40 rounded-full ${data?.verified ? 'bg-green-500' :'bg-green-500'} mt-5`}></div>
              <h3 className='text-white mt-5'>{data?.verified ? 'Verified' : 'Verified'}</h3>
            </div>

            <div className='qr-container bg-white p-5 rounded-lg mt-10 md:mt-0'>
              {/* <QRCode
                size={200}
                
                value={`https://irc.vikasana.tech/user/${user?.uid}`}
                viewBox={`0 0 256 256`}
                /> */}
                <img className='w-44 h-44' src={data?.qr} />
            </div>
            
          </div>

          <div className='flex flex-col md:flex-row flex-wrap w-full justify-around mt-10'>
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="First Name" 
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                defaultValue={data?.first_name}
                ///value={data?.first_name}
                
                
                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Last Name" 
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                defaultValue={data?.last_name}
                
                ///value={data?.first_name}
                
                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Email"
                type='email' 
                variant="filled"
                defaultValue={data?.email}
                ///value={data?.first_name}
                InputProps={{
                  readOnly: true,
                }}
                
                
                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Mobile"
                 
                variant="filled"
                defaultValue={data?.mobile}
                
                ///value={data?.first_name}
                InputProps={{
                  readOnly: true,
                }}
                
                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Team Name"
                 
                variant="filled"
                defaultValue={data?.team}
                ///value={data?.first_name}
                InputProps={{
                  readOnly: true,
                }}

                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="University Name"
                 
                variant="filled"
                defaultValue={data?.university}
                ///value={data?.first_name}
                InputProps={{
                  readOnly: true,
                }}
                
                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Instructor Name"
                 
                variant="filled"
                defaultValue={data?.instructor_name}
                ///value={data?.first_name}
                InputProps={{
                  readOnly: true,
                }}
                
                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Instructor Number"
                 
                variant="filled"
                defaultValue={data?.instructor_number}
                ///value={data?.first_name}
                InputProps={{
                  readOnly: true,
                }}
                
                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Blood Group"
                 
                variant="filled"
                defaultValue={data?.blood}
                ///value={data?.first_name}
                InputProps={{
                  readOnly: true,
                }}
                
                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Arrival Date"
                type='date'
                variant="filled"
                defaultValue={data?.arrival_date}
                ///value={data?.first_name}
                InputProps={{
                  readOnly: true,
                }}
                
                />
            </div>
            

          </div>



        </div>
    </>
  )
}

export default User