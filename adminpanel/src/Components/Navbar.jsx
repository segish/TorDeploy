import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import MenuItems from './MenuItems';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { FaBookMedical } from 'react-icons/fa';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const Navbar = () => {
    const [active, setActive] = useState(false);

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

    const showMenu = () => {
        setActive(!active)
    }

    return (
        <>
            <div className="sticky z-[10000000] top-0 flex border-b-2 dark:border-orange-600 w-full">
                <div className="bg-white  dark:bg-slate-950 dark:text-white flex w-full">
                    <div className="sticky top-0 md:px-5 flex h-[65px] items-center justify-around  w-full text-gray-500  ">
                        <div className="cursor-pointer hover:rounded-lg items-center hover:text-orange-600 hover:border-orange-600 hover:border-2 sm:hidden flex justify-start" >
                            <div className='sm:hidden p-3 ' >
                                {!active ? <MenuIcon fontSize='large' onClick={showMenu} className='w-5 cursor-pointer dark:text-gray-200 text-black hover:text-orange-500' />
                                    : <CloseIcon fontSize='large' onClick={showMenu} className='w-5 cursor-pointer text-red-500 hover:text-orange-500' />}
                            </div>
                        </div>
                        <div className="cursor-pointer hover:rounded-lg items-center hover:text-orange-600 hover:border-orange-600 hover:border-2 gap-4 sm:flex">
                            <Link to="/">
                                <div className="p-1 sm:hidden">
                                    <HomeIcon className="text-orange-500" fontSize='large' />
                                </div>
                            </Link>
                        </div>
                        <div className="hidden p-2 cursor-pointer items-center hover:rounded-lg hover:text-orange-600 hover:border-orange-600 hover:border-2 gap-2 sm:flex">
                            <NavLink to="/students/newstudent" className={({ isActive }) => `flex text-lg gap-3 items-center ${isActive ? ' text-yellow-400' : ''}`}>
                                <div className="p-1">
                                    <PersonAddIcon className='text-zinc-500' />
                                </div>
                                <span className={`hidden md:flex`}>Add students</span>
                            </NavLink>
                        </div>
                        <div className="hidden p-2 cursor-pointer items-center hover:rounded-lg hover:text-orange-600 hover:border-orange-600 hover:border-2 gap-2 sm:flex">
                            <NavLink to="/courses/new" className={({ isActive }) => `flex text-lg gap-3 items-center ${isActive ? ' text-yellow-400' : ''}`}>
                                <div className="p-1">
                                    <FaBookMedical fontSize='larger' className='text-zinc-500' />
                                </div>
                                <span className={`hidden md:flex`}>Add Course</span>
                            </NavLink>
                        </div>
                        <div className=" hidden cursor-pointer items-center hover:rounded-lg hover:text-orange-600 hover:border-orange-600 hover:border-2 gap-2 p-1 sm:flex">
                            <NavLink to="/instructors/new" className={({ isActive }) => `flex text-lg gap-3 items-center ${isActive ? ' text-yellow-400' : ''}`}>
                                <div className="p-1">
                                    <GroupAddIcon className='text-zinc-500' />
                                </div>
                                <span className={`hidden md:flex`}>Add Community</span>
                            </NavLink>
                        </div>
                        <div className="cursor-pointer hover:rounded-lg hover:text-orange-600 gap-4 flex">
                            <button className=" p-3 cursor-pointer hover:rounded-lg  text-black hover:text- dark:text-gray-200 "
                                onClick={handleThemeSwitch}>
                                {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                            </button>
                        </div>
                    </div>
                    <hr className="w-auto" />
                </div>
            </div>
            <div className=" sticky top-16 box-border flex z-50 w-full"><MenuItems showMenu={showMenu} active={active} /></div>
        </>
    )
}
export default Navbar