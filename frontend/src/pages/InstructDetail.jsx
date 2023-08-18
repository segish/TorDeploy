import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeRequest } from '../axios';
const InstructDetail = () => {
    document.title="Instructor's details"
    const id = useLocation().pathname.split("/")[2]
    const [instructor, setInstructor] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cataresponse = await makeRequest.get('instrutcors/' + id)
                setInstructor(cataresponse?.data)
            } catch (err) {
                console.error(err)
            }
        };
        fetchData();
    }, [id]);
    return (
        <div className='relative flex items-center justify-center md:my-12 dark:bg-black bg-white'>
            <div className="w-full md:w-3/4 shadow-lg p-0 lg:p-4  dark:bg-slate-950 dark:text-zinc-400 bg-gray-100  md:dark:border">
                <div className="flex flex-col justify-between gap-4">
                    <div className="flex  w-full pt-4 justify-center">
                        <img className="w-[200px] h-[200px]  object-cover rounded-full" src={instructor?.profile} alt="" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col text-center pb-4 text-2xl">
                            <span className='text-orange-600 font-bold pb-4'>{instructor?.firstName + "  " + instructor?.lastName}</span>
                            <p className='text-base'>{instructor?.description}</p>
                        </div>
                        <div className="bg-orange-600  h-0.5 rounded-xl"></div>
                        <div className="flex flex-col md:justify-between md:items-center pt-4">
                            <div className="flex gap-5 md:gap-16 lg:w-10/12 text-lg m-2 ">
                                <span>Phone Number :</span><span>{instructor?.phone}</span>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>
                            <div className="flex gap-5 md:gap-24 lg:w-10/12 text-lg m-2">
                                <span>profession :</span><span>{instructor?.profession}</span>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>

                            <div className="flex md:gap-32  flex-col md:flex-row lg:w-10/12 text-lg m-2">
                                <span>Email :</span><a target="_blank" rel="noreferrer" className='text-orange-500 hover:text-blue-700' href={"mailto:" + instructor.email}><span>{instructor?.email}</span></a>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>
                            <div className="flex md:gap-24  flex-col md:flex-row lg:w-10/12 text-lg m-2">
                                <span>Telegram :</span><a target="_blank" rel="noreferrer" className='text-orange-500 hover:text-blue-700' href={instructor.telegram}><span>{instructor?.telegram}</span></a>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>
                            <div className="flex md:gap-24 flex-col md:flex-row lg:w-10/12 text-lg m-2">
                                <span>Instagram:</span><a target="_blank" rel="noreferrer" className='text-orange-500 hover:text-blue-700' href={instructor.instagram}><span>{instructor?.instagram}</span></a>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>
                            <div className="flex md:gap-24  flex-col md:flex-row lg:w-10/12 text-lg m-2">
                                <span>Linkedin :</span><a target="_blank" rel="noreferrer" className='text-orange-500 hover:text-blue-700' href={instructor.linkedin}><span>{instructor?.linkedin}</span></a>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default InstructDetail;