import React from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar'

const Home = () => {

  const navigate = useNavigate()

  return (
    <>
    <Navbar />
    <div className='index-bg h-screen'>
      <div className='w-screen relative h-screen px-16 flex items-center md:items-start justify-center flex-col'>
        <h2 className='text-3xl md:text-6xl font-monument font-bold mb-2'>CHANGING THE</h2>
        <h2 className='text-3xl md:text-6xl font-monument font-bold'>WAY YOU <span className='text-pink-600'>INNOVATE</span></h2>

        <h3 className='text-lg md:text-2xl text-white/70 text-center md:text-left w-full md:w-1/2 mt-10'>Join us at an incredible event! Explore, participate and learn more about the most Extreme and Unique Space Rover project competition</h3>

        <button onClick={() => navigate('/login')} className='text-lg md:text-xl bg-gradientBlue active:bg-blue-500 border-2 border-solid border-white py-3 px-8 mt-8 font-circular rounded-xl'>PARTICIPANT LOGIN</button>

        <h3 className='absolute hidden md:block bottom-5 left-5 font-tele text-white/80'>International Rover<br></br>Challenge 2023</h3>
        <h3 className='absolute hidden md:block bottom-5 right-5 font-tele text-white/80'>Presidency University,<br></br>Bangalore</h3>

        <h3 className='absolute block md:hidden bottom-5 left-5 font-tele text-sm text-white/60'>International Rover<br></br>Challenge 2023<br></br>Presidency University,<br></br>Bangalore</h3>
      </div>
      

    </div>
    </>
  )
}

export default Home