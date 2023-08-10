import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeRequest } from '../axios';
const InstructDetail = () => {

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
        <div className='relative flex items-center h-screen justify-center dark:bg-black bg-white'>
            <div className="w-full lg:w-1/2 shadow-2xl p-0 lg:p-4  dark:bg-slate-950 dark:text-zinc-400 bg-zinc-200  dark:border rounded-lg">
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
                        <div className="flex flex-col justify-between items-center pt-4">

                            <div className="flex gap-16 lg:w-10/12 text-lg m-2 ">
                                <span>Phone Number :</span><span>{instructor?.phone}</span>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>
                            <div className="flex gap-24  flex-col lg:flex-row lg:w-10/12 text-lg m-2">
                                <span>profession :</span><span>{instructor?.profession}</span>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>

                            <div className="flex gap-32  flex-col lg:flex-row lg:w-10/12 text-lg m-2">
                                <span>Email :</span><a target="_blank" rel="noreferrer" className='text-orange-500 hover:text-blue-700' href={"mailto:" + instructor.email}><span>{instructor?.email}</span></a>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>
                            <div className="flex gap-24  flex-col lg:flex-row lg:w-10/12 text-lg m-2">
                                <span>Telegram :</span><a target="_blank" rel="noreferrer" className='text-orange-500 hover:text-blue-700' href={instructor.telegram}><span>{instructor?.telegram}</span></a>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>
                            <div className="flex gap-24 flex-col lg:flex-row lg:w-10/12 text-lg m-2">
                                <span>Instagram:</span><a target="_blank" rel="noreferrer" className='text-orange-500 hover:text-blue-700' href={instructor.instagram}><span>{instructor?.instagram}</span></a>
                            </div>
                            <div className="h-[1px] w-full bg-slate-400 rounded-sm"></div>
                            <div className="flex gap-24  flex-col lg:flex-row lg:w-10/12 text-lg m-2">
                                <span>Linkedin :</span><a target="_blank" rel="noreferrer" className='text-orange-500 hover:text-blue-700' href={"mailto:" + instructor.email}><span>{instructor?.linkedin}</span></a>
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