import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth, db, collection } from '../firebase'
import { doc, getDoc, addDoc } from "firebase/firestore";

import { signOut } from 'firebase/auth';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    //signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    let userCreation = await createUserWithEmailAndPassword(auth, email, password)
    //console.log(userCreation)
  }

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
    
    <div>
      {/* <form onSubmit={handleSubmit}>
        <input className='text-black' type='text' onChange={(e) => setEmail(e.target.value)} value={email} />
        <input className='text-black' type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <input className='text-white' type='submit'></input>
      </form> */}
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  )
}

export default Registration