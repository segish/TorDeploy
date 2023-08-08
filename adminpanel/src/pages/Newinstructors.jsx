import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from "react";
import { makeRequest } from '../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Popup from '../Components/Popup';
import ConfirmationPopup from '../Components/ConfirmationPopup';

const New = () => {
    const [instructors, SetInstructors] = useState('')
    const [showPopup, setShowPopup] = useState(false);
    const [showConfPopup, setShowConfPopup] = useState(false)

    const queryClient = useQueryClient();

    const showConfirmationPopup = (event) => {
        event.preventDefault();
        setShowPopup(true);
    };

    function covertToBase64(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            SetInstructors((prev) => ({ ...prev, profile: reader.result }))
        };
        reader.onerror = error => {
            console.log(error);
        };
    }

    const mutation = useMutation(
        (addins) => {
            return makeRequest.post("Instructors/add", addins);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["instructors"]);
            },
        }
    );

    const handlechange = (e) => {
        SetInstructors((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        mutation.mutate(instructors)
        setShowPopup(false)
        setShowConfPopup(true)
    }

    return (
        <div className="flex dark:text-gray-400">
            <div className="flex-initial w-full h-fit ">
                <div className="shadow-md justify-center  p-10 pt-6   mx-5 sm:mx-20 text-gray-400 flex items-center text-xl font-bold">
                    <span >ADD NEW COMMUNITY MEMBER</span>
                </div>
                <div className="shadow-md   p-10 pt-6   sm:mx-20 flex items-center justify-start ">
                    <form className="flex flex-col w-full justify-center gap-14">
                        <div className="flex flex-col lg:flex-row lg:flex-wrap  justify-between w-full">
                            <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Firstname</label>
                                <input name="firstName" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" placeholder="first_name" />
                            </div>
                            <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Lastname</label>
                                <input name="lastName" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" placeholder="last_name" />
                            </div>
                            <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Email</label>
                                <input name="email" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" placeholder="Someone@email.com" />
                            </div>
                            <div className="flex-col flex items-start m-4 w-full lg:w-2/5 border-2 rounded-md">
                                <label htmlFor="file" className="font-bold text-lg cursor-pointer"><AddPhotoAlternateIcon fontSize="large" />Profile</label>
                                <input name="profile" id="file" accept="image/star" onChange={covertToBase64} className="dark:bg-slate-800 hidden dark:border-gray-500  w-full px-1" type="file" />
                                <img className={instructors.profile && "h-36 w-36 rounded-full object-cover cursor-pointer"} src={instructors?.profile} alt="" />
                            </div>
                            <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Phone</label>
                                <input name="phone" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="string" placeholder="+251-" />
                            </div>
                            <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Telegram</label>
                                <input name="telegram" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="string" placeholder="https://t.me/..." />
                            </div>
                            <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Instagram</label>
                                <input name="instagram" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="string" placeholder="https://instagram.com/..." />
                            </div>
                            <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Linkedin</label>
                                <input name="linkedin" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="string" placeholder="https://linkedin.com/..." />
                            </div>
                            <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">Profession</label>
                                <input name="profession" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" placeholder="user_name" />
                            </div>
                            <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                                <label className="font-bold text-lg">description</label>
                                <textarea name="description" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" placeholder="user_name" />
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center">
                            <button type="submit" className="bg-slate-400 dark:text-orange-600 dark:bg-slate-800 dark:border-orange-600 text-slate-200  p-3  px-12 border-2 hover:shadow-md hover:text-slate-100 rounded-md text-lg" onClick={showConfirmationPopup}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="absolute top-3/4 left-1/2">
                {showPopup && (
                    <Popup onConfirm={(e) => handleSubmit(e)} onCancel={() => setShowPopup(false)} message={"Do You Want To Add This Instructor ?"} />
                )}
                {showConfPopup && (
                    <ConfirmationPopup onCancel={() => setShowConfPopup(false)} confmessage={"Instructor Added successfully"} />
                )}
            </div>
        </div>

    )
}
export default New