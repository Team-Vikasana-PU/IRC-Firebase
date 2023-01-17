import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'

import map from '../assets/map.jpeg'

import { auth, db, hotels_collection, storage } from '../firebase'
import { doc, getDoc, getDocs , setDoc } from "firebase/firestore";

import CallIcon from '@mui/icons-material/Call';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Accommodation = () => {

    const [allHotels, setAllHotels] = useState([])

    useEffect(() => {
        const getAllHotels = async () => {
            const querySnapshot = await getDocs(hotels_collection);
            
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let docData = doc.data()
                
                setAllHotels((prev) => [...prev, docData])
            });    
        }
        getAllHotels()
        
    }, [])


  return (
    <>
        <Navbar />
        <div className='pt-32 w-full'>
            <div className='flex justify-center w-full text-pink-600 font-monument font-bold text-2xl md:text-5xl'>
                Accommodation

            </div>

            <div className='w-full flex flex-wrap p-10 justify-center'>

                {
                    allHotels?.map((item, key) => {
                        return (
                            <div key={key} className='flex w-72 md:mr-10 mb-10 flex-col items-center bg-slate-800 border-4 border-solid hover:border-gradientBlue border-white rounded-xl hover:scale-110 transition ease-in delay-100'>
                                <div>
                                    <img className='rounded-t-xl w-full object-contain' src={map} />
                                </div>
                                <div className='flex flex-col items-center w-full mt-3'>
                                    <h2 className='px-2 text-center text-xl font-bold font-circular'>{item?.name}</h2>
                                    <p className='mt-5 font-tele underline'><CallIcon className='mr-2' fontSize='medium' /><a href={`tel:+91${item?.number}`}>+91 {item?.number}</a></p>
                                </div>
                                <div className='flex w-full mt-auto'>
                                    <a target='_blank' href={item?.link} className='text-md mx-5 w-full md:text-md hover:bg-gradientPink bg-gradientBlue active:bg-blue-500 border-2 border-solid flex justify-center items-center border-white py-2 px-5 my-4 font-circular rounded-md'>OPEN <OpenInNewIcon className='ml-2' /></a>
                                </div>
                            </div>
                        )
                    })
                }
                

            </div>
        </div>
    </>
  )
}

export default Accommodation