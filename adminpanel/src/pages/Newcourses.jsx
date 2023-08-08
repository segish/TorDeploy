import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../axios";
import Popup from '../Components/Popup';
import ConfirmationPopup from '../Components/ConfirmationPopup';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Newcourses = () => {

    const queryClient = useQueryClient();

    const [chapters, setchapters] = useState([])

    const [selectedValue, setSelectedValue] = useState('free');

    const [course, setcourse] = useState({ section: [] })

    const [showPopup, setShowPopup] = useState(false);
    const [showConfPopup, setShowConfPopup] = useState(false)

    const covertToBase64=(e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        console.log("reader.result")
        reader.onload = () => {
            setcourse((prev) => ({ ...prev, banner: reader.result }))
            console.log(reader.result)
        };
        reader.onerror = error => {
            console.log(error);
        };
    }
    const addmutation = useMutation(
        (course) => {
            return makeRequest.post("courses/add", course);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["chapters"]);
            },
        }
    );

    const { data } = useQuery(["instructors"], () =>
        makeRequest.get("instructors/getall").then((res) => {
            return res.data;
        })
    );

    const handleValueChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const handleChange = (index, event) => {
        const values = [...chapters]
        values[index][event.target.name] = event.target.value
        setchapters(values)
    }

    const handleCourses = (e) => {
        setcourse((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const addchapters = (e) => {
        e.preventDefault();
        setchapters([...chapters, { title: '', descreption: '', youtubeLink: '', type: 'free' }])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        course.section = chapters;
        course.type = selectedValue;
        addmutation.mutate(course)
        setShowPopup(false)
        setShowConfPopup(true)
    }
    return (
        <div className="flex dark:text-gray-200">
            <div className="flex-initial w-full h-fit">
                <div className="shadow-md justify-center  p-10 pt-6   mx-5 sm:mx-20 text-gray-400 flex items-center text-xl font-bold">
                    <span >ADD NEW COURSE</span>
                </div>
                <div className="shadow-md   p-10 pt-6   sm:mx-20 flex flex-col items-center justify-start  ">
                    <form className="flex flex-col w-full justify-center items-center gap-14">
                        <div className="flex flex-col lg:flex-row lg:flex-wrap  justify-between w-full">
                            <div className=" flex-col flex items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Course Name</label>
                                <input className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" name="title" placeholder="title" onChange={handleCourses} />
                            </div>
                            <div className=" flex  flex-col items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Catagory</label>
                                <input className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" name="category" placeholder="catagory" onChange={handleCourses} />
                            </div>
                            <div className=" flex  flex-col items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Instructor</label>
                                <select id="selectInput " value={course?.instructor} onChange={handleCourses} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" name="instructor">
                                    {data?.map(instructors => (
                                        data?.length===0?<option className="dark:bg-slate-900 text-lg text-center" value="">No instruct available</option>
                                        :<option className="dark:bg-slate-900 text-lg text-center" value={instructors.firstName + " " + instructors.lastName+"/:/"+instructors._id}>{instructors.firstName + " " + instructors.lastName}</option>
                                    ))
                                    }
                                </select>
                            </div>
                            <div className=" flex  flex-col items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Descreption</label>
                                <textarea className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" name="descreption" placeholder="Course Descreption" onChange={handleCourses} />
                            </div>
                            <div className=" flex  flex-col items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Course Type</label>
                                <select id="selectInput " value={selectedValue} onChange={handleValueChange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" name="type">
                                    <option className="dark:bg-slate-900 text-lg text-center" value="free">free</option>
                                    <option className="dark:bg-slate-900 text-lg text-center" value="premium">premium</option>
                                </select>
                            </div>
                            <div className="flex-col flex items-start m-4 w-full p-4 lg:w-2/5 border-2 rounded-md">
                                <label htmlFor="coursebannerupload" className="font-bold text-lg cursor-pointer"><AddPhotoAlternateIcon fontSize="large" />course banner</label>
                                <input name="banner" id="coursebannerupload" accept="image/star" onChange={covertToBase64} className="dark:bg-slate-800 hidden dark:border-gray-500  w-full px-1" type="file" />
                                <img className={course.banner && "h-36 w-full rounded-sm object-cover cursor-pointer"} src={course?.banner} alt="" />
                            </div>
                        </div>
                        <span className="w-full text-center text-4xl font-bold underline">Chapters</span>
                        <div className="flex flex-col lg:flex-row lg:flex-wrap -mt-12  justify-between w-full">
                            {chapters.map((chapter, index) => (
                                <div key={index} className="flex-col flex items-start m-4 w-full lg:w-2/5">
                                    <div className=" gap-11 w-full">
                                        <div className=" flex  flex-col w-full">
                                            <label className="font-bold text-2xl py-7 ">CHAPTER {index + 1}</label>
                                            <label className="font-bold text-lg"> Title</label>
                                            <input name="title" onChange={(e) => handleChange(index, e)} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" placeholder="I.E ROBOTICSqwsc" />
                                        </div>
                                        <div className=" flex  flex-col w-full">
                                            <label className="font-bold text-lg">Chapter Description</label>
                                            <textarea className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" onChange={(e) => handleChange(index, e)} name="descreption" id="" rows="5"></textarea>
                                        </div>
                                        <div className=" flex  flex-col w-full">
                                            <label name="link" className="font-bold text-lg">Youtube link</label>
                                            <input onChange={(e) => handleChange(index, e)} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" name="youtubeLink" placeholder="https://www.youtube.com/embed/GVGeTshQ7iU" />
                                        </div>
                                        <div className=" flex  flex-col w-full">
                                            <label className="font-bold text-lg">chapter Type</label>
                                            <select id="selectInputchapter" value={chapters[index].type} onChange={(e) => handleChange(index, e)} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" name="type">
                                                <option className="dark:bg-slate-900 text-lg text-center" value="free">free</option>
                                                <option className="dark:bg-slate-900 text-lg text-center" value="premium">premium</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        <div className="m-4">
                            <button className="h-16 rounded-md bg-slate-400 dark:text-orange-600 dark:bg-slate-800 dark:border-orange-600 text-slate-200  p-3 w-[200px] px-12 border-2 hover:shadow-md hover:text-slate-100" onClick={addchapters}>
                                Add Chapters
                            </button>
                        </div>
                    </form>
                    <div className="flex w-full items-center justify-center">
                        <button type="submit" className=" rounded-md mx-[135px] h-16 mb-3 bg-slate-400 dark:text-orange-600 dark:bg-slate-800 dark:border-orange-600 text-slate-200   w-[200px]  px-12 border-2 hover:shadow-md hover:text-slate-100" onClick={() => setShowPopup(true)}>Save This Course</button>
                    </div>
                </div>
            </div>
            <div className="absolute top-3/4 left-1/2">
                {showPopup && (
                    <Popup onConfirm={(e) => handleSubmit(e)} onCancel={() => setShowPopup(false)} message={"Do You Want To Add This Course ?"} />
                )}
                {showConfPopup && (
                    <ConfirmationPopup onCancel={() => setShowConfPopup(false)} confmessage={"Course Added successfully"} />
                )}
            </div>
        </div>
    )
}
export default Newcourses