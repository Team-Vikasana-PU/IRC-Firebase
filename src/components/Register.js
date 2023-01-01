import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged, OAuthProvider, signOut } from "firebase/auth";

import { auth, db, teams_collection, storage } from '../firebase'
import { doc, getDoc, getDocs , setDoc } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";

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

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
          if(user) {
            const docRef = doc(db, "participants", user.uid);
    
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
              navigate('/profile')
            }
            setUser(user)
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
    const [team, setTeam] = useState('')
    const [allTeams, setAllTeams] = useState([])
    const [university, setUniversity] = useState('')
    const [picture, setPicture] = useState()

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

        const data = {
            email: email,
            first_name: fName,
            last_name: lName,
            mobile: mobileNo,
            team: team.name,
            university: team.university,
            team_ref: team.id,
            avatar: imageURL,
            verified: false,
        }

        const res = await setDoc(doc(db, "participants", user.uid), data);
        navigate('/profile')

    }


    

  return (
    <div className='w-full bg-cover bg-fixed bg-background pb-10' style={{backgroundImage: `url(${bg})`}}>
        <form className='w-full flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='register-container flex flex-col w-2/5 text-stone-50 py-10'>
            <div className='image-container mb-5'>
                <img className='' src={banner} />
            </div>
            
            <div className='details-container w-full mt-5 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100 focus:border-blue-500'>
                <h1 className='text-3xl'>IRC 2023 Registration Form</h1>
                <p className='my-4 text-form'>Hosted by Team Vikasana</p>
                <hr></hr>
                <p className='text-form mt-2'>lorem lorem lorem lorem lorem loremlorem lorem loremlorem lorem loremlorem lorem loremlorem lorem loremlorem lorem loremlorem lorem loremlorem lorem lorem</p>
            </div>

            <div className='input-container w-full mt-5 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Email</h1>
                <TextField
                required
                className="!mt-8 w-2/3" 
                id="standard-basic" 
                label="Email" 
                type="email"
                variant="standard"
                onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>

            <div className='input-container w-full mt-5 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>First Name</h1>
                {/* <input className='mt-8 bg-transparent border-b-2 border-stone-100 w-2/3 placeholder:text-form pb-1' placeholder='Your first name...' type='text' name='f_name' /> */}
                <TextField
                required
                className="!mt-8 w-2/3" 
                id="standard-basic" 
                label="First name" 
                variant="standard"
                onChange={(e) => {setFName(e.target.value)}}
                />
            </div>

            <div className='input-container w-full mt-5 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Last Name</h1>
                <TextField
                required
                className="!mt-8 w-2/3" 
                id="standard-basic" 
                label="Last name" 
                variant="standard" 
                onChange={(e) => {setLName(e.target.value)}}
                />
            </div>

            <div className='input-container w-full mt-5 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Mobile Number</h1>
                <TextField
                required
                className="!mt-8 w-2/3" 
                id="standard-basic" 
                label="Mobile number" 
                variant="standard"
                onChange={(e) => {setMobileNo(e.target.value)}}
                />
            </div>

            <div className='input-container w-full mt-5 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Team Name</h1>
                <FormControl className='!mt-8 w-64'>
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

            <div className='input-container w-full mt-5 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>University Name</h1>
                
                    
                    <TextField
                        required
                        
                        className="!mt-8 w-2/3" 
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

            <div className='input-container w-full mt-5 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100'>
                <h1 className='text-2xl'>Upload your picture</h1>
                {
                    pictureError &&
                    <h1 className='text-lg text-red-600'>Invalid Image Selected</h1>
                }
                <Button sx={{width:'500px'}} className='!rounded-lg !py-3 !mt-8 !w-64 text-left !text-blue-600 !bg-transparent !border-solid !border !border-stone-50' variant="contained" component="label">
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
  )
}

export default Register