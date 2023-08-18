import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
const Hero = () => {

  const { currentUser } = useContext(AuthContext)
  const { refreshLogin } = useContext(AuthContext)
  return (
    <div id="home" className='w-full h-[65vh] bg-gradient-to-r from-orange-800  flex flex-col justify-between'>
      <div className='flex '>
        <div className='flex flex-col rounded-lg bg-white dark:bg-black justify-center px-[10%] p-[4%] my-[10%] mx-8 md:px-6 md:py-8 md:my-11 md:mx-12'>
          <p className='text-2xl font-bold dark:text-white text-center px-10 py-2'>Welcome to NERD's educational program.</p>
          <p className='text-2xl font-bold dark:text-white text-center px-3 py-3'>Quality education at your fingertips. Explore elearning today</p>
          {!currentUser&&<button className='border border-orange-600 w-[130px] py-3 my-4 mx-auto ' onClick={() => refreshLogin(true)}>Get Started</button>}
        </div>
      </div>
    </div>
  )
}

export default Hero
