import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();

  const [course, setCourse] = useState(location.hash === '#cors');
  const [comunity, setComunity] = useState(location.hash === '#inst');
  const about = location.pathname === '/AboutUs';
  const currentPath = location.pathname
  const Home = location.pathname === '/' && !course && !comunity

  const showMenu = () => {
    setActive(!active)
  }

  const smoothScroll = (target) =>{
    navigate("/")
    const element = document.getElementById(target);
    if (element) {
      setCourse(false)
      setComunity(false)
      target === "cors" ? setCourse(true) : setComunity(true)
      const elementPosition = element?.getBoundingClientRect().top;
      window.scrollTo({
        top: elementPosition + window.scrollY - 100,
        behavior: 'smooth',
      });
    }
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

  const [theme, setTheme] = useState("dark");

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
    <div className="w-full h-[80px] top-0 bg-blue-950 dark:bg-black text-white z-[99999999999] sticky border-b-2">
      <div className="flex px-2 items-center justify-between w-full h-full">
        <div className='flex items-center'>
          <div className='bg-logo-image px-2 py-2 w-12 h-12 bg-cover' />
          <Link to="/"><h1 className='text-3xl font-bold mr-4 hover:text-orange-500 sm:text-4xl cursor-pointer'> NERD</h1></Link>
          <ul className='hidden lg:flex uppercase px-4'>
            <li><a href="/" className={`hover:text-orange-500 cursor-pointer ${Home ? 'text-orange-600' : ''}`}>Home</a></li>
            <li><span onClick={() => smoothScroll("cors")} className={`hover:text-orange-500 cursor-pointer  ${course&&currentPath === "/" ? 'text-orange-600' : ''}`}>Courses</span></li> 
            <li><span onClick={() => smoothScroll("inst")} className={`hover:text-orange-500 cursor-pointer ${comunity&&currentPath === "/" ? 'text-orange-600' : ''}`}>Our Communities</span></li>
            <li><Link to="/AboutUs" className={`hover:text-orange-500 cursor-pointer ${about ? 'text-orange-600' : ''}`}>About Us</Link></li>
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