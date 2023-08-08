import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuItems from './MenuItems';
import CloseIcon from '@mui/icons-material/Close';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AuthContext } from '../context/AuthContext';
import { makeRequest } from '../axios';


export default function NavBar({ setRegister }) {
  const [active, setActive] = useState(false);
  const {currentUser, refreshUser} = useContext(AuthContext)
  const { refreshLogin} = useContext(AuthContext)

  const showMenu = () => {
    setActive(!active)
  }



  const handleLogout = async () => {
    try {
      const res = await makeRequest.post("auth/logout", {
        withCredentials: true,
      })
      console.log(res)
      refreshUser(null)
      refreshLogin(true);
    } catch (err) {
      console.log(err.response.data)
    }

  }

  const [theme, setTheme] = useState("light");

 useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className="w-full h-[80px] top-0 z-50 bg-blue-950 dark:bg-black text-white sticky border-b-2">
      <div className="flex px-2 items-center justify-between w-full h-full">
        <div className='flex items-center'>
          <div className='bg-logo-image px-2 py-2 w-12 h-12 bg-cover' />
          <Link to="/"><h1 className='text-3xl font-bold mr-4 hover:text-orange-500 sm:text-4xl cursor-pointer'> NERD</h1></Link>

          <ul className='hidden lg:flex uppercase px-4'>
            <li><a href="/" className=' hover:text-orange-500  cursor-pointer'>Home</a></li>
            <li><a href="/#cors" className=' hover:text-orange-500 cursor-pointer'>Courses</a></li> 
            <li><a href="/#inst" className=' hover:text-orange-500 cursor-pointer'>Instructors</a></li>
            <li><Link to="/AboutUs" className=' hover:text-orange-500'>About Us</Link></li>


          </ul>
        </div>

        <div className='flex pr-4'>
          <NightlightOutlinedIcon className='flex m-4 hover:text-orange-500 cursor-pointer dark:hidden ' onClick={handleThemeSwitch} />
          <div className='hidden dark:flex'><LightModeIcon className='m-4 hover:text-orange-500 cursor-pointer' onClick={handleThemeSwitch} /></div>
          <div className="flex lg:hidden items-center">{!active ? <MenuIcon onClick={showMenu} className='w-5 cursor-pointer hover:text-orange-500' /> : <CloseIcon onClick={showMenu} className='w-5 cursor-pointer hover:text-orange-500  ' />}</div>
          {currentUser ?
            (<><button className='hidden lg:flex px-4 py-3 bg-transparent rounded-full text-white mr-4'><PersonOutlineOutlinedIcon/>{currentUser.username}</button>
              <button className='hidden lg:flex px-4 py-3' onClick={handleLogout}>Sign out</button>
            </>)
            :(<>
              <button className='hidden lg:flex px-4 py-3 bg-transparent text-white mr-4' onClick={() => refreshLogin(true)}>Sign In</button>
              <button className='hidden lg:flex px-4 py-3 ' onClick={()=>setRegister(true)}>Sign up</button>
            </>)
          }
        </div>
      </div>

      <MenuItems showMenu={showMenu} active={active} setRegister={setRegister}/>


    </div>



  )
}

/*<div>
<MenuItems showMenu={showMenu} active={active}/>
</div>*/