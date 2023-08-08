import React, { useContext, useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PopUp from './PopUp';
import { makeRequest } from '../axios';


const Courses = () => {
  const [popup, setPopup] = useState(false)


  const navigate = useNavigate();

  const { currentUser, refreshLogin } = useContext(AuthContext);

  const [courseCategorie, setCourseCategorie] = useState([])
  const [response, setResponse] = useState([]);
  const [active, setActive] = useState();

  useEffect(() => {

    const fetchData = async () => {
      const loader = document.getElementById("courseloader");
      const gridview = document.getElementById("gridview");
      loader.classList.remove('hidden');
      loader.classList.add('visible')
      gridview.classList.remove('grid');
      gridview.classList.add('visible')
      try {
        const cataresponse = await makeRequest.get('courses/categories')
        setCourseCategorie(cataresponse.data)
        setActive(cataresponse?.data[0])
        const couresponse = await makeRequest.get("courses/all/" + cataresponse?.data[0]);
        const resss = await couresponse?.data
        setResponse(resss);
        loader.classList.remove('visible');
        loader.classList.add('hidden');
        gridview.classList.remove('hidden');
        gridview.classList.add('grid');
      } catch (err) {
        console.error(err.response?.data)
      }
    };

    fetchData();
  }, []);

  document.getElementById(active)?.classList.add('text-black')
  document.getElementById(active)?.classList.add('dark:text-white')
  document.getElementById(active)?.classList.add('text-2xl')

  const handleclick = async (category) => {

    const loader = document.getElementById("courseloader");
    const gridview = document.getElementById("gridview");
    loader.classList.remove('hidden');
    loader.classList.add('visible')
    gridview.classList.remove('grid');
    gridview.classList.add('hidden')
    document.getElementById(active)?.classList.remove('text-black')
    document.getElementById(active)?.classList.remove('dark:text-white')
    document.getElementById(active)?.classList.remove('text-2xl')

    const couresponse = await makeRequest.get("courses/all/" + category);
    const resss = await couresponse.data
    setResponse(resss);
    loader.classList.remove('visible');
    loader.classList.add('hidden');
    gridview.classList.remove('hidden');
    gridview.classList.add('grid');
    setActive(category);
  }

  const toCoursePage = (courseId) => {
    if (!currentUser) {
      console.log("you must login")
      refreshLogin(true)
    } else {
      navigate("/course/" + courseId)
    }
  }

  const send = (e, type, id) => {
    if (!currentUser) {
      console.log("you must login")
      refreshLogin(true)
    }
    else if (type === "premium" && currentUser?.paymentStatus === "free") {
      setPopup(true)
    } else {
      toCoursePage(id)
    }
  }


  return (
    <div id="cors" className=' flex flex-col text-center  mx-8 space-y-3 mt-40 md:mt-14  '>
      <h1 className='text-4xl font-bold w-full dark:bg-black dark:text-white bg-orange-100 border border-orange-600 rounded-md px-2 py-3'>Courses</h1>
      <div className='text-xs lg:text-xl flex space-x-4 ml-1 font-bold text-gray-500 w-full justify-center'>
        {courseCategorie?.map(category => (
          <h3 className='lg:hover:text-orange-600 dark:hover:text-orange-600 cursor-pointer' id={category} onClick={() => handleclick(category)}>{category}</h3>
        ))
        }
      </div>
      <div className='w-full overflow-hidden dark:text-white lg:rounded justify-between items-center '>
        <div className='flex duration-500 scroll-smooth' id='container'>
          <div className='flex gap-4 justify-center items-center w-full'>
            <div className='w-screen hidden gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' id='gridview'>
              {response?.map(Course => (
                <div className='text-left flex flex-col border border-gray-300 p-8 rounded-md shadow-md relative'>
                  <h2 className='text-2xl text-center -mt-4 font-bold mb-2 underline'>{Course.title}</h2>
                  <h6 className='absolute top-0 right-0 text-xs dark:bg-white bg-orange-300 text-red-600 rounded-full m-1 p-1 flex font-bold'>{Course.type}</h6>
                  <img src={Course.banner} alt="" className={Course.banner && 'h-36 rounded-md'} />
                  <h3 className='mb-3 text-center'>
                    {Course.descreption.split(' ').slice(0, 42).join(' ')}
                    {Course.descreption.split(' ').length > 42 ? '......' : ''}
                  </h3>
                  <div className="flex items-center justify-center">
                    <h2 className='text-xl text-center -mt-4 mb-2'>instructor&nbsp;:&nbsp;</h2>
                    <Link to={"Instructor/"+Course.instructor.split("/:/")[1]}>
                      <h2 className='text-xl hover:text-orange-600 dark:hover:text-orange-600 text-center dark:text-white -mt-4 font-bold mb-2'> {Course.instructor.split("/:/")[0]}</h2>
                    </Link>
                  </div>
                  <button className='px-8 mx-6 py-3' onClick={(e) => send(e, Course.type, Course._id)}>More Info</button>
                </div>
              ))
              }
            </div>
            <div className="custom-loader hidden" id='courseloader'></div>
          </div>
        </div>
      </div>
      <div className='flex  m-4 pt-20'>
        <div className='h-[200px] w-full bg-gradient-to-r from-orange-700 to-orange-400 rounded-lg object-cover' alt="" />
      </div>
      {popup && <div className='fixed top-0 bottom-0 w-[100%] z-[999999999999]'><PopUp setPopup={setPopup} /></div>}
    </div>
  );
};

export default Courses;