import React, {useState, useEffect} from 'react'
import QRCode from "react-qr-code";
import { QRious } from 'react-qrious'
import { useQrious } from 'react-qrious'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar'

import { auth, db, teams_collection, storage } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocs, setDoc, updateDoc  } from "firebase/firestore";

import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';

const Profile = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  const [editing, setEditing] = useState(false)

  const [email, setEmail] = useState('')
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [instructorName, setInstructorName] = useState('')
  const [instructorNumber, setInstructorNumber] = useState('')
  const [team, setTeam] = useState('')
  const [allTeams, setAllTeams] = useState([])
  const [university, setUniversity] = useState('')
  const [picture, setPicture] = useState()
  const [arrivalDate, setArrivalDate] = useState('')

  

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

        setFName(docData?.first_name)
        setLName(docData?.last_name)
        setMobileNo(docData?.mobile)
        setBloodGroup(docData?.blood)
        setInstructorName(docData?.instructor_name)
        setInstructorNumber(docData?.instructor_number)
        setArrivalDate(docData?.arrival_date)

        

      }
      else {
        navigate('/login')
      } 
      
    })
    
  }, [])
  
  

 

  const updateProfile = async () => {
    const data = {
      
      first_name: fName,
      last_name: lName,
      mobile: mobileNo,
      blood: bloodGroup,
      
      instructor_name: instructorName,
      instructor_number: instructorNumber,
      arrival_date: arrivalDate,
      
      
      
      
    }
    const docRef = doc(db, "participants", user?.uid);

    const updated = await updateDoc(docRef, data)
  }

  if(loading) {
    return null
  }

  return (
    <>
        <Navbar />
        <div className='w-screen min-h-screen bg-background py-32 profile-container'>
        
          <div className='flex flex-col md:flex-row w-full justify-around items-center'>
            <div className=''>
              <Avatar sx={{width: 200, height: 200}} src={data?.avatar} />
            </div>

            <div className='verification-container flex flex-col items-center font-circular mt-10 md:mt-0'>
              <h3 className='text-white/80'>Verification Status</h3>
              <div className={`w-40 h-40 rounded-full ${data?.verified ? 'bg-green-500' :'bg-red-600'} mt-5`}></div>
              <h3 className='text-white mt-5'>{data?.verified ? 'Verified' : 'Not Verified'}</h3>
            </div>

            <div className='qr-container bg-white p-5 rounded-lg group mt-10 md:mt-0'>
              {/* <QRCode
                size={200}
                
                value={`https://irc.vikasana.tech/user/${user?.uid}`}
                viewBox={`0 0 256 256`}
                /> */}
                <img className='w-44 h-44 blur-sm group-hover:blur-none transition ease-in deplay-100' src={data?.qr} />
            </div>
            
          </div>

          <div className='flex flex-col md:flex-row flex-wrap w-full justify-around mt-10'>
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="First Name" 
                InputProps={{
                  readOnly: !editing,
                }}
                variant="filled"
                defaultValue={data?.first_name}
                ///value={data?.first_name}
                onChange={(e) => setFName(e.target.value)}
                
                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Last Name" 
                InputProps={{
                  readOnly: !editing,
                }}
                variant="filled"
                defaultValue={data?.last_name}
                onChange={(e) => setLName(e.target.value)}
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
                disabled
                
                />
            </div>
            
            <div className='w-full px-3 md:px-0 md:w-1/2 flex justify-center'>
              <TextField
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Mobile"
                 
                variant="filled"
                defaultValue={data?.mobile}
                onChange={(e) => setMobileNo(e.target.value)}
                ///value={data?.first_name}
                InputProps={{
                  readOnly: !editing,
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
                disabled
                
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
                disabled
                
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
                  readOnly: !editing,
                }}
                onChange={(e) => setInstructorName(e.target.value)}
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
                  readOnly: !editing,
                }}
                onChange={(e) => setInstructorNumber(e.target.value)}
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
                  readOnly: !editing,
                }}
                onChange={(e) => setBloodGroup(e.target.value)}
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
                  readOnly: !editing,
                }}
                onChange={(e) => setArrivalDate(e.target.value)}
                />
            </div>
            

          </div>

          <div className='flex w-full justify-center mt-10'>
            <button onClick={() => {
              if(editing) {
                updateProfile()
                setEditing(false)
              }
              else {
                setEditing(true)
              }
            }} className='bg-gradientBlue text-white font-tele px-5 py-4'>{editing ? 'Save Profile' : 'Edit Profile'}</button>
          </div>

        </div>
    </>
  )
}

export default Profile