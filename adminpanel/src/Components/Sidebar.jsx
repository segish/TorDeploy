import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { makeRequest } from '../axios';
import HomeIcon from '@mui/icons-material/Home';

const Sidebar = () => {

    const { refreshUser } = useContext(AuthContext)

    const handeleLogout = async () => {

        try {
            const res = await makeRequest.post("auth/logout")
            console.log(res)
            refreshUser(null)
        } catch (err) {
            console.log(err.response.data)
        }
    }

    const customCss = {
        height: "calc(100vh - 68px)",
    }

    return (
        <>
            <div className="hidden sm:block w-[15%] h-screen sticky top-0  dark:text-gray-200 ">

                <div className="flex justify-center items-center h-16 border-b-2 border-gray-200 dark:border-orange-600 my-0.5" >
                    <NavLink to="/" className={({ isActive }) => `text-orange-600  ${isActive ? ' text-yellow-400' : ''}`}>
                        <span className="text-md lg:text-xl font-bold cursor-pointer text-center"><HomeIcon fontSize='large' className={`text-inherit`} />NerdAdmin</span>
                    </NavLink>
                </div>
                <div style={customCss} className="w-full flex flex-col justify-between">
                    <div >
                        <p className='text-base mb-6 text-gray-500  pt-6 px-5 lg:px-14 pb-0 hidden lg:flex'>STAKEHOLDERS</p>
                        <NavLink to="/courses" className={({ isActive }) => `text-gray-500 text-lg ${isActive ? ' text-yellow-400' : ''}`}>
                            <div className=' pb-5 lg:gap-3 flex flex-col lg:flex-row items-center pt-6 w-full justify-center cursor-pointer hover:bg-orange-600 hover:text-white'>
                                <MenuBookIcon className='text-xs md:text-xl' />
                                <span className={`hidden md:flex`}> Courses </span>
                            </div>
                        </NavLink>
                        <NavLink to="/students" className={({ isActive }) => `text-gray-500 text-lg ${isActive ? ' text-yellow-400' : ''}`}>
                            <div className='pb-5 lg:gap-3 flex flex-col lg:flex-row items-center pt-6 w-full justify-center cursor-pointer hover:bg-orange-600 hover:text-white'>
                                <GroupSharpIcon className='text-xs' />
                                <span className={`hidden md:flex`}>Students</span>
                            </div>
                        </NavLink>
                        <NavLink to="/instructors" className={({ isActive }) => `text-gray-500 text-lg ${isActive ? ' text-yellow-400' : ''}`}>
                            <div className='pb-5 lg:gap-3 flex flex-col lg:flex-row items-center pt-6 w-full justify-center cursor-pointer hover:bg-orange-600 hover:text-white'>
                                <SchoolIcon className='text-xs' />
                                <span className={`hidden md:flex`}> Communities</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className="flex flex-col md:mb-28">
                        <NavLink to="/changepsd" className={({ isActive }) => `text-gray-500 text-lg ${isActive ? ' text-yellow-400' : ''}`}>
                            <div className='pb-5 lg:gap-3 flex flex-col lg:flex-row items-center pt-6 w-full justify-center cursor-pointer  hover:bg-orange-600 hover:text-white'>
                                <VpnKeyIcon className='text-xs ' />

                                <label className='hidden md:flex text-center'>
                                    Change Password
                                </label>
                            </div>
                        </NavLink>
                        <button onClick={handeleLogout} className='w-full text-lg text-red-600'>
                            <div className='pb-5 lg:gap-3 flex flex-col lg:flex-row items-center pt-6  w-full justify-center cursor-pointer  hover:bg-orange-600 hover:text-white'>
                                <ExitToAppSharpIcon className='text-xs text-red-600' />
                                <label className='hidden md:flex'>
                                    Logout
                                </label>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block w-0.5 border-solid border-r-2 h-screen sticky top-0 dark:border-orange-600 text-slate-200 dark:text-orange-600">I</div>
        </>
    )
}
export default Sidebar