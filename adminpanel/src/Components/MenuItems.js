import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import { AuthContext } from '../context/Authcontext';
import { makeRequest } from '../axios';

const MenuItems = ({ showMenu, active }) => {

  const { refreshUser } = useContext(AuthContext)

  const handeleLogout = async () => {
    showMenu();
    try {
      const res = await makeRequest.post("auth/logout")
      console.log(res.data)
      refreshUser(null)
    } catch (err) {
      console.log(err.response.data)
    }
  }
  return (
    <ul className={active ? 'absolute w-full  uppercase bg-orange-600 dark:bg-orange-950 dark:text-slate-300 py-2 text-base sm:hidden' : 'hidden'}>
      <li className='border-b-2 border-zinc-500 w-full p-3 hover:cursor-pointer' onClick={showMenu}> <div className='flex justify-around gap-4'>
        <Link to="/students" className=' hover:text-orange-500'> STUDENTS</Link>
        <Link to="/students/newstudent">
          <AddCircleOutlineOutlinedIcon fontSize='large' className='text-slate-600' />
        </Link>
      </div>
      </li>
      <li className='border-b-2 border-zinc-500 w-full p-3 hover:cursor-pointer' onClick={showMenu}>
        <div className='flex justify-around gap-4'>
          <Link to="/instructors" className=' hover:text-orange-500'>INSTRUCTORS</Link>
          <Link to="/instructors/new">
            <AddCircleOutlineOutlinedIcon fontSize='large' className='text-slate-600' />
          </Link>
        </div>
      </li>
      <li className='border-b-2 border-zinc-500 w-full p-3 hover:cursor-pointer' onClick={showMenu}>
        <div className='flex justify-around gap-4'>
          <Link to="/courses" className=' hover:text-orange-500'> COURSES</Link>
          <Link to="/courses/new"><AddCircleOutlineOutlinedIcon fontSize='large' className='text-slate-600' />
          </Link>
        </div>
      </li>
      <div className='flex flex-col my-4'>
        <button className='bg-transparent  text-red-700 text-lg font-bold px-8 pt-3' onClick={handeleLogout}>
          <ExitToAppSharpIcon fontSize='large' className='text-xs ' />Logout
        </button>
        <Link to="/changepsd" className='bg-transparent flex items-center justify-center tracking-wide px-8 pt-3 mb-3 text-lg font-bold' onClick={showMenu}>
          <VpnKeyIcon fontSize='large' className='text-xs ' /><p>Change password</p>
        </Link>
      </div>
    </ul>

  );
};

export default MenuItems;
