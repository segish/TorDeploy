import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import { Link, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { makeRequest } from '../axios';

const Sidebar = () => {

    const location = useLocation();

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


    const coursepage = location.pathname === '/courses';
    const studentpage = location.pathname === '/students';
    const instructpage = location.pathname === '/instructors';

    return (
        <>
            <div className="hidden sm:block w-[20%] h-screen sticky top-0  dark:text-gray-200 ">

                <div className="flex justify-center items-center h-16 border-b-2 border-gray-200 dark:border-orange-600 my-0.5" >
                    <Link to="/">
                        <span className="text-md lg:text-xl font-bold text-orange-600 cursor-pointer">NerdAdmin</span>
                    </Link>
                </div>
                <div className="w-full">
                    <p className='text-base mb-6 text-gray-500  pt-6 px-5 lg:px-14 pb-0 hidden lg:flex'>STAKEHOLDERS</p>
                    <div >
                        <Link to="/courses">
                            <div className=' pb-5 gap-3 flex items-center pt-6 px-5 lg:px-14 cursor-pointer hover:bg-orange-600  text-gray-500 hover:text-white'>
                                <MenuBookIcon className='text-xs md:text-xl' />
                                <span className={`hidden md:flex ${coursepage ? 'text-yellow-400' : ''}`}> Courses </span>
                            </div>
                        </Link>
                        <Link to="/students">
                            <div className='pb-5 gap-3 flex items-center pt-6 px-5 lg:px-14 cursor-pointer hover:bg-orange-600  text-gray-500 hover:text-white'>
                                <GroupSharpIcon className='text-xs' />
                                <span className={`hidden md:flex ${studentpage ? 'text-yellow-400' : ''}`}>Students</span>
                            </div>
                        </Link>
                        <Link to="/instructors">
                            <div className='pb-5 gap-3 flex items-center pt-6 px-5 lg:px-14 cursor-pointer hover:bg-orange-600  text-gray-500 hover:text-white'>
                                <SchoolIcon className='text-xs' />
                                <span className={`hidden md:flex ${instructpage ? 'text-yellow-400' : ''}`}> Communities</span>
                            </div>
                        </Link>
                    </div>
                    <button onClick={handeleLogout} className='w-full'>
                        <div className='pb-5 gap-3 flex items-center mt-32 pt-6  px-5 lg:px-14 cursor-pointer  hover:bg-orange-600  text-gray-500 hover:text-white'>
                            <ExitToAppSharpIcon className='text-xs ' />
                            <label className='hidden md:flex'>
                                Logout
                            </label>
                        </div>
                    </button>
                    <Link to="/changepsd">
                        <div className='pb-5 gap-3 flex items-center pt-6  px-5 lg:px-14 cursor-pointer  hover:bg-orange-600  text-gray-500 hover:text-white'>
                            <VpnKeyIcon className='text-xs ' />

                            <label className='hidden md:flex w-full'>
                                Change Password
                            </label>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="hidden sm:block w-0.5 border-solid border-r-2 h-screen sticky top-0 dark:border-orange-600 text-slate-200 dark:text-orange-600">I</div>
        </>
    )
}
export default Sidebar