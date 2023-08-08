import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeRequest } from '../axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useQuery} from "@tanstack/react-query";

const Course = () => {
 
 const {currentUser} = useContext(AuthContext)
 const courseid = useLocation().pathname.split('/')[2]
  const [currentVideo, setCurrentVideo] = useState();
  const [courses, setCourses] = useState();
  const {data} = useQuery(["course"], () =>
    makeRequest.get("courses/"+courseid).then((res) =>{
      return res.data
    })
  )
 
   useEffect(() => {
    setCourses(data)
    setCurrentVideo(data?.section[0])
    setActivVid(data?.section[0])
    setActivIndex(0)
}, [data]);

 const navigate = useNavigate();

  const [activV, setActivVid] = useState(courses?.section[0]);
  const [activIndex, setActivIndex] = useState(0);

  useEffect(()=>{
    document.getElementById(activV?.youtubeLink+activIndex)?.classList.add('bg-slate-800')
    document.getElementById(activV?.title+activIndex)?.classList.add('text-white')
    document.getElementById(activV?.youtubeLink+activIndex)?.classList.add('dark:bg-slate-800')
    document.getElementById(activV?.title+activIndex)?.classList.add('dark:text-white')
  },[activV])
    
  
  document.getElementById(activV?.youtubeLink+activIndex)?.classList.add('bg-slate-800')
  document.getElementById(activV?.title+activIndex)?.classList.add('text-white')
  document.getElementById(activV?.youtubeLink+activIndex)?.classList.add('dark:bg-slate-800')
  document.getElementById(activV?.title+activIndex)?.classList.add('dark:text-white')

  const handleclicks = (vid,index) => {
    setCurrentVideo(vid);
    document.getElementById(activV?.youtubeLink+activIndex)?.classList.remove('bg-slate-800')
    document.getElementById(activV?.title+activIndex)?.classList.remove('text-white')
    document.getElementById(activV?.youtubeLink+activIndex)?.classList.remove('dark:bg-slate-800')
    document.getElementById(vid.youtubeLink+index)?.classList.add('bg-slate-800')
    document.getElementById(vid.title+index)?.classList.add('text-white')
    document.getElementById(vid.title+index)?.classList.add('dark:text-white')
    setActivVid(vid)
    setActivIndex(index)
  }

   useEffect(()=>{
    if(!currentUser){
      navigate("/")
    }
   }
   )

  return (
    <div className="bg-white dark:bg-black flex flex-col gap-3 justify-between items-center pt-24 pb-24">
      <div className=" flex w-full md:w-11/12 h- items-center justify-center p-4 rounded-md border border-orange-500 dark:bg-slate-950 dark:text-white bg-orange-100">
          <h2 className='text-3xl'>
            {courses?.title}
          </h2>
        </div>
      <div className="w-full md:w-11/12 flex flex-col md:flex-row gap-4">
        <div className="flex flex-col overflow-y-auto items-center flex-[3] md:flex-[4] h-28 md:h-[550px] rounded-md shadow-lg dark:bg-slate-950 bg-slate-200 p-3  dark:border">
          <div className='h-full w-[90%]'>
            {currentVideo?.type!=="free" && currentUser?.paymentStatus!=="premium"  ? <div className='flex flex-col h-full w-full items-center justify-center'><LockOutlinedIcon fontSize='large' className='text-red-600'/><h1 className='flex text-3xl text-center  items-center justify-center p-4 mt-8 text-red-700'>This chapter content is locked because it is above your clearance level</h1></div>:<embed src={currentVideo?.youtubeLink} loop controls className="main-video h-[80%] rounded mt-1 w-full"></embed>}
            {currentVideo?.type==="free" ? <h3 className="main-vid-title text-xl  dark:text-zinc-400 text-zinc-600 py-4">{currentVideo?.title}</h3>:""}
            {currentVideo?.type==="free" ?  <h2 className='pb-2  text-orange-500'>chapter description</h2>:""}
           {currentVideo?.type==="free" ?  <h5 className='dark:text-zinc-400'>{currentVideo?.descreption}</h5>:""}
          </div>
        </div>

        <div className=" flex flex-col items-center video-list-container flex-[2] h-[550px] overflow-y-auto rounded-md shadow-lg dark:bg-slate-950 bg-slate-200 mb-2 lg:p-4 dark:border">
          {
            courses?.section.length === 0? <div className='flex w-full h-full justify-center items-center'>
          <p className='text-red-600 text-center text-3xl'>
            no chapters  available yet
            </p> </div>
          :courses?.section.map((video, index) => (
            <div id={video.youtubeLink+index} className="flex w-full  items-center gap-4 p-4 cursor-pointer rounded-md mb-3 last:mb-0" onClick={() => handleclicks(video,index)}>
              <embed src={video.youtubeLink} class="list-video w-24 h-16 rounded-md"></embed> 
              <h3 id={video.title+index} className="text-base text-slate-900 dark:text-zinc-400">{video.title} {video.type!=="free" && currentUser?.paymentStatus!=="premium" ? <LockOutlinedIcon/>: " " }</h3>
            </div>
          ))}
        </div>
        
      </div>
      <div className=" w-full  md:w-11/12  items-center p-4 rounded-lg dark:border dark:bg-slate-950 dark:text-zinc-400 bg-slate-200">
      <div className='flex flex-col overflow-y-auto items-center flex-[3] md:flex-[4] '>
      <h2 className=' text-orange-500 pb-2'>Course Description</h2>
          <h2 className=''>
           {courses?.descreption}
          </h2>
          </div>
        </div>
    </div>
  );
};

export default Course;
