//import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { makeRequest } from '../axios';
const MenuItems = ({ showMenu, active, setRegister }) => {
  const { refreshLogin } = useContext(AuthContext)
  const { currentUser, refreshUser } = useContext(AuthContext)


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

  return (

    <ul className={active ? 'absolute w-full  uppercase dark:bg-black bg-slate-900 px-8 lg:hidden' : 'hidden'}>

      <li className='border-b-2 border-zinc-500 w-full'><a href="/" className=' hover:text-orange-500  cursor-pointer'>Home</a></li>
      <li className='border-b-2 border-zinc-500 w-full'><a href="/#cors" className=' hover:text-orange-500 cursor-pointer'>Courses</a></li>
      <li className='border-b-2 border-zinc-500 w-full'><a href="/#inst" className=' hover:text-orange-500 cursor-pointer'>Instructors</a></li>
      <li className='border-b-2 border-zinc-500 w-full'><Link to="/AboutUs" className=' hover:text-orange-500'>About Us</Link></li>
      <div className='flex flex-col my-4'>
        {currentUser ?
          (<><button className='bg-transparent  text-white px-8 py-3 mb-4'><PersonOutlineOutlinedIcon />{currentUser.username}</button>
            <button className='px-8 py-3' onClick={handleLogout}>Sign out</button>
          </>)
          : (<>
            <button className='bg-transparent  text-white px-8 py-3 mb-4' onClick={() => refreshLogin(true)}>Sign In</button>
            <button className='px-8 py-3' onClick={() => setRegister(true)}>Sign up</button>
          </>)
        }
      </div>
    </ul>

  );
};

export default MenuItems;