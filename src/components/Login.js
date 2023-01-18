import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, OAuthProvider, signOut } from "firebase/auth";

import Navbar from './Navbar'

import { auth, db, collection } from '../firebase'
import { doc, getDoc, addDoc } from "firebase/firestore";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import login_bg from '../assets/login_bg.png'
import google from '../assets/google.svg'
import microsoft from '../assets/microsoft.svg'
import vikasana from '../assets/vikasana_login.svg'
import spros from '../assets/spros.svg'
import pu from '../assets/pu.svg'

const Login = () => {
  const navigate = useNavigate()

  const msProvider = new OAuthProvider('microsoft.com')


  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    //signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      msProvider.providerId
      
      
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    
    onAuthStateChanged(auth, async (user) => {
      
      if(user) {
        const docRef = doc(db, "participants", user.uid);

        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
          navigate('/profile')
        }
        else {
          navigate('/register')
        }
      }
      
    })
    
  }, [])

  return (
    <>
    <Navbar />
    <div className='login-bg overflow-y-hidden w-screen h-screen flex flex-col md:flex-row'>
        <div className='login-bg-image h-full w-full md:w-1/2 z-10 relative'>
            {/* <img className='' src={login_bg} /> */}
            
            <div className='absolute left-10 bottom-10 hidden md:block'>
              <h2 className='font-monument text-3xl text-bold'>INTERNATIONAL ROVER<br></br>CHALLENGE 2023</h2>
              <h2 className='font-tele text-lg text-white/80 mt-5'>CHANGING THE WAY YOU INNOVATE</h2>
            </div>
            
        </div>

        <div className='login-container overflow-hidden w-full md:w-1/2 h-full border-solid border-t md:border-l border-white/30 relative'>
            <div className='bg-login-box bg-login-box-left bg-gradientPink md:bg-gradientBlue'></div>
            <div className='bg-login-box bg-login-box-right bg-gradientBlue'></div>

            <div className='glass-bg w-full absolute right-0 h-full flex flex-col items-center justify-center py-5 px-8 md:px-44'>

              <div className='absolute top-5 md:top-20 flex'>
                <img className='mr-5' src={spros} />
                <img className='mr-5' src={pu} />
                <img className='mr-5' src={vikasana} />
              </div>

              <div className='flex flex-col text-center md:text-left pt-16 md:mt-0'>
                <h1 className='font-monument text-bold text-md md:text-2xl'>LOG IN TO YOUR ACCOUNT</h1>
                <h2 className='w-full md:w-3/4 text-sm md:text-md font-tele text-white/80 mt-5'>Log in to stay in-the-know about the event</h2>
                <div className='flex flex-col mt-2 md:mt-5'>
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                  
                  {/* <button className='login-button items-center login-button-first py-4 px-5 flex'>
                    <img className='google-svg mr-5' src={google} />
                    Sign-in with Google
                  </button>
                  
                  <button className='login-button items-center mt-5 login-button-second py-4 px-5 flex'>
                    <img className='google-svg mr-5' src={microsoft} />
                    Sign-in with Microsoft
                  </button> */}
                </div>
              </div>
              
            </div>
            
        </div>
        
        


    </div>
    </>
  )
}

export default Login