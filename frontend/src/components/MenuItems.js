//import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { makeRequest } from '../axios';
const MenuItems = ({ showMenu, active, setRegister }) => {

  const { refreshLogin } = useContext(AuthContext)
  const { currentUser, refreshUser } = useContext(AuthContext)
  const location = useLocation();

  const registeration = () =>{
    showMenu();
    setRegister(true)
  }

  const Logging = () => {
    showMenu(); 
    refreshLogin(true)
  }

  const handleLogout = async () => {
    showMenu();
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
  const Home = location.hash === '' && location.pathname === '/';
  const course = location.hash === '#cors';
  const comunity = location.hash === '#inst';
  const about = location.pathname === '/AboutUs';

  return (

    <ul className={active ? 'absolute w-full border-b-2 border-white uppercase dark:bg-black bg-slate-900 px-8 lg:hidden z-[99999999999]' : 'hidden'}>

      <li className='border-b-2 border-zinc-500 w-full' onClick={showMenu}><a href="/" className={`hover:text-orange-500 flex cursor-pointer w-full ${Home ? 'text-orange-600' : ''}`}>Home</a></li>
      <li className='border-b-2 border-zinc-500 w-full' onClick={showMenu}><a href="/#cors" className={`hover:text-orange-500 flex cursor-pointer w-full ${course ? 'text-orange-600' : ''}`}>Courses</a></li>
      <li className='border-b-2 border-zinc-500 w-full' onClick={showMenu}><a href="/#inst" className={`hover:text-orange-500 flex cursor-pointer w-full ${comunity ? 'text-orange-600' : ''}`}>Our Communities</a></li>
      <li className='border-b-2 border-zinc-500 w-full' onClick={showMenu}><Link to="/AboutUs" className={` hover:text-orange-500 flex w-full ${about ? 'text-orange-600' : ''}`}>About Us</Link></li>
      <div className='flex flex-col my-4'>
        {currentUser ?
          (<><button className='bg-transparent  text-white px-8 py-3 mb-4' onClick={showMenu}><PersonOutlineOutlinedIcon />{currentUser.username}</button>
            <button className='px-8 py-3' onClick={handleLogout}>Sign out</button>
          </>)
          : (<>
            <button className='bg-transparent  text-white px-8 py-3 mb-4' onClick={Logging}>Sign In</button>
            <button className='px-8 py-3' onClick={registeration}>Sign up</button>
          </>)
        }
      </div>
    </ul>

  );
};

export default MenuItems;
