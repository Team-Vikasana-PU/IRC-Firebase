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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';

import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';

import AutorenewIcon from '@mui/icons-material/Autorenew';


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
    const [covid, setCovid] = useState()
    const [arrivalDate, setArrivalDate] = useState('')
    const [foodType, setFoodType] = useState('')
    const [teamCaptain, setTeamCaptain] = useState(false)
    const [accommodationLink, setAccommodationLink] = useState('')
    const [courier, setCourier] = useState('')

    const [pictureError, setPictureError] = useState(false)

    const [submitLoading, setSubmitLoading] = useState(false)
    

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

        setSubmitLoading(true)

        const storageRef = ref(storage, `/user_images/${user.uid}_${Date.now()}`)
        const metadata = picture.type
        const imageSnapShot = await uploadBytes(storageRef, picture, metadata)
        const imageURL = await getDownloadURL(storageRef)


        const qrRef = ref(storage, `/profile_qr/${user.uid}_${Date.now()}`)
        const qrmeta = "image/png"
        const qrsnap = await uploadString(qrRef, dataUrl, 'data_url', qrmeta)
        const qrURL = await getDownloadURL(qrRef)
        
        const covidRef = ref(storage, `/covid/${user.uid}_${Date.now()}`)        
        const covidsnap = await uploadBytes(covidRef, covid)
        const covidUrl = await getDownloadURL(covidRef)

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
            accommodation: accommodationLink,
            university: team.university,
            team_ref: team.id,
            avatar: imageURL,
            covid:covidUrl,
            verified: false,
            food: foodType,
            captain: teamCaptain,
            storage: courier,
            qr:qrURL
        }

        const res = await setDoc(doc(db, "participants", user.uid), data);
        navigate('/profile')

    }


    

  return (
    <>
    <Navbar />
    <div className='w-full bg-cover bg-fixed bg-background py-16'>
        <div className='w-full flex flex-col items-center' >
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
                
                <div className='details-container w-full mt-5 pt-7 pb-5 px-5 bg-black rounded-2xl border-solid border-2 border-stone-100 focus:border-blue-500'>
                    <h1 className='text-3xl'>Form has been closed for responses.</h1>

                </div>

            </div>

        </div>
    </div>
    </>
  )
}

export default Register