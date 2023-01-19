import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'

import { QRious } from 'react-qrious'
import { useQrious } from 'react-qrious'

import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged, OAuthProvider, signOut } from "firebase/auth";

import { auth, db, teams_collection, storage } from '../firebase'
import { doc, getDoc, getDocs , setDoc } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, uploadString } from "firebase/storage";

import banner from '../assets/register_banner.png'
import bg from '../assets/register_bg.png'


import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ImageIcon from '@mui/icons-material/Image';

import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';


const Register = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState()

    const [value, setValue] = useState('')
    const [dataUrl, setQrious] = useQrious({ value })

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
          if(user) {
            const docRef = doc(db, "participants", user.uid);
    
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
              navigate('/profile')
            }
            setUser(user)
            setValue(`https://irc.vikasana.tech/user/${user?.uid}`)
          }
          else {
            navigate('/login')
          } 
          
        })
        
    }, [])

    

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

    const [pictureError, setPictureError] = useState(false)
    

    useEffect(() => {
        const getAllTeams = async () => {
            const querySnapshot = await getDocs(teams_collection);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let docData = doc.data()
                let temp_team = {
                    id: doc.id,
                    ...docData

                }
                setAllTeams((prev) => [...prev, temp_team])
            });    
        }
        getAllTeams()
        
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        

        if(pictureError) {
            return
        }

        const storageRef = ref(storage, `/user_images/${user.uid}_${Date.now()}`)
        const metadata = picture.type
        const imageSnapShot = await uploadBytes(storageRef, picture, metadata)
        const imageURL = await getDownloadURL(storageRef)

        
        console.log(dataUrl)

        const qrRef = ref(storage, `/profile_qr/${user.uid}_${Date.now()}`)
        const qrmeta = "image/png"
        const qrsnap = await uploadString(qrRef, dataUrl, 'data_url', qrmeta)
        const qrURL = await getDownloadURL(qrRef)

        const data = {
            email: email,
            first_name: fName,
            last_name: lName,
            mobile: mobileNo,
            blood: bloodGroup,
            team: team.name,
            instructor_name: instructorName,
            instructor_number: instructorNumber,
            arrival_date: arrivalDate,
            university: team.university,
            team_ref: team.id,
            avatar: imageURL,
            verified: false,
            qr:qrURL
        }

        const res = await setDoc(doc(db, "participants", user.uid), data);
        navigate('/profile')

    }


    

  return (
    <>
    <Navbar />
    <div className='w-full bg-cover bg-fixed bg-background py-10'>
        <form className='w-full flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='register-container flex flex-col w-11/12 md:w-2/5 text-stone-50 py-10'>
            <div className='image-container mb-5'>
                <img className='' src={banner} />
            </div>
            
            <div className='details-container w-full mt-5 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100 focus:border-blue-500'>
                <h1 className='text-3xl'>IRC 2023 Registration Form</h1>
                <p className='my-4 text-form'>Hosted by Team Vikasana</p>
                <hr></hr>
                <p className='text-form mt-2'>Conceptualize, design, develop and operate an astronaut-assistive next-gen Mars rover and perform specific missions in Mars simulated conditions</p>
            </div>

            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Email</h1>
                <TextField
                required
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Email" 
                type="email"
                variant="standard"
                onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>

            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>First Name</h1>
                {/* <input className='mt-8 bg-transparent border-b-2 border-stone-100 w-2/3 placeholder:text-form pb-1' placeholder='Your first name...' type='text' name='f_name' /> */}
                <TextField
                required
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="First name" 
                variant="standard"
                onChange={(e) => {setFName(e.target.value)}}
                />
            </div>

            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Last Name</h1>
                <TextField
                required
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Last name" 
                variant="standard" 
                onChange={(e) => {setLName(e.target.value)}}
                />
            </div>

            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Mobile Number</h1>
                <TextField
                required
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Mobile number" 
                variant="standard"
                onChange={(e) => {setMobileNo(e.target.value)}}
                />
            </div>
            
            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Blood Group</h1>
                <TextField
                required
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Blood Group" 
                variant="standard"
                onChange={(e) => {setBloodGroup(e.target.value)}}
                />
            </div>
            
            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Arrival Date</h1>
                <TextField
                required
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Arrival Date" 
                variant="standard"
                type="date"
                onChange={(e) => {setArrivalDate(e.target.value)}}
                />
            </div>
            
            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Instructor Name</h1>
                <TextField
                required
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Instructor Name" 
                variant="standard"
                onChange={(e) => {setInstructorName(e.target.value)}}
                />
            </div>
            
            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Instructor Number</h1>
                <TextField
                required
                className="!mt-8 w-full md:w-2/3" 
                id="standard-basic" 
                label="Instructor Number" 
                variant="standard"
                onChange={(e) => {setInstructorNumber(e.target.value)}}
                />
            </div>

            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Team Name</h1>
                <FormControl className='!mt-8 w-full md:w-64'>
                    <InputLabel id="demo-simple-select-label">Team Name</InputLabel>
                    
                    <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={team?.name}
                    label="Team Name"
                    onChange={(e) => {setTeam(e.target.value)}}
                    >
                        {
                            allTeams.map((item, key) => {
                                return (
                                    <MenuItem key={key} value={item}>{item?.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>

            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>University Name</h1>
                
                    
                    <TextField
                        required
                        
                        className="!mt-8 w-full md:w-2/3" 
                        id="standard-basic" 
                        label="University Name" 
                        variant="standard"
                        defaultValue="University"
                        value={team?.university}
                        InputProps={{
                            readOnly: true,
                          }}
                        
                    />
                    {/* <Select
                    required
                    
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={team?.university}
                    label="University Name"
                    onChange={(e) => setUniversity(e.target.value)}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */}
                
            </div>

            <div className='input-container w-full mt-10 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Upload your picture</h1>
                {
                    pictureError &&
                    <h1 className='text-lg text-red-600'>Invalid Image Selected</h1>
                }
                <Button sx={{width:'500px'}} className='!rounded-lg !py-3 !mt-8 !w-full !md:w-64 text-left !text-blue-600 !bg-transparent !border-solid !border !border-stone-50' variant="contained" component="label">
                    { picture ? <ImageIcon /> : <UploadIcon /> }
                    <p className='whitespace-nowrap	overflow-hidden text-ellipsis'>
                    { picture ? picture.name : 'Upload Image' }
                    </p>
                    <input onChange={(e) => {
                        if(!e.target.files[0].type.includes('image')) {
                            setPicture()
                            setPictureError(true)
                            return
                        }
                        setPictureError(false)
                        
                        setPicture(e.target.files[0])
                        }} hidden accept="image/*" type="file" />
                </Button>
                
                
            </div>

            
            
        </div>

        <input type='submit' className='bg-violet-600 py-2 px-5 cursor-pointer' />
        </form>
    </div>
    </>
  )
}

export default Register