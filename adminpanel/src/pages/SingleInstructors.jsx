import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Popup from '../Components/Popup';
import ConfirmationPopup from '../Components/ConfirmationPopup';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const SingleInstruct = () => {

    const queryClient = useQueryClient();

    const userId = useLocation().pathname.split("/")[2]

    const [Instruct, setInstruct] = useState();

    const [newInstruct, setnewInstruct] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [showConfPopup, setShowConfPopup] = useState(false)

    const { data } = useQuery(["singleinstructors"], () =>
        axios.get("http://localhost:8000/api/Instructors/" + userId).then((res) => {
            return res.data;
        })
    );
    function covertToBase64(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setInstruct((prev) => ({ ...prev, profile: reader.result }))
            setnewInstruct((prev) => ({ ...prev, profile:reader.result}))
        };
        reader.onerror = error => {
            console.log(error);
        };
    }

    const mutation = useMutation(
        (updatecourse) => {
            return axios.post("http://localhost:8000/api/Instructors/update/" + userId, updatecourse);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["singleinstructors"]);
                queryClient.invalidateQueries(["Instructors"]);
            },
        }
    );

    useEffect(() => {
        queryClient.invalidateQueries(["singleinstructors"]);
    }, [userId, queryClient]);

    useEffect(() => {
        setnewInstruct(data)
    }, [data])

    const handleinputchange = (e) => {
        setInstruct((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        mutation.mutate(Instruct)
        setShowPopup(false)
        setShowConfPopup(true)
    }

    return (
        <div className="flex dark:text-gray-200">
            <div className="flex-initial w-full ">
                <div className="p-8 mx-10 md:mx flex items-center gap-7">
                    <div className="flex-col flex items-start m-4 w-full lg:w-2/5 ">
                        <label htmlFor="instructimgfile" className="font-bold text-lg cursor-pointer"><AddPhotoAlternateIcon fontSize="large" />Change</label>
                        <input name="profile" id="instructimgfile" accept="image/star" onChange={covertToBase64} className="dark:bg-slate-800 hidden dark:border-gray-500  w-full px-1" type="file" />
                        <img className={newInstruct?.profile && "h-36 w-36 rounded-full object-cover cursor-pointer"} src={newInstruct?.profile} alt="" />
                        <p className="md:text-5xl text-xl text-gray-600">Instructor's Profile</p>
                    </div>
                </div>
                <div className="overflow-hidden shadow-sm rounded-md shadow-black p-4 md:p-10  mx-12 m-6 text-gray-600 flex-col justify-between gap-3  dark:shadow-lg dark:shadow-slate-800">
                    <div className="items-center">
                        <div className="py-5 gap-16 flex items-center">
                            <span>First Name :</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="firstName" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newInstruct?.firstName} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-16 flex items-center">
                            <span>Last Name :</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="lastName" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newInstruct?.lastName} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-20 flex items-center">
                            <span>Email :</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="email" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newInstruct?.email} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-20 flex items-center">
                            <span>Phone  -:</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="phone" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newInstruct?.phone} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-12 flex items-center">
                            <span>Description  -:</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <textarea name="description" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newInstruct?.description} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-16 flex items-center">
                            <span>Telegram  -:</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="telegram" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newInstruct?.telegram} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-16 flex items-center">
                            <span>Instagram  -:</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="instagram" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newInstruct?.instagram} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-20 flex items-center">
                            <span>likedin  -:</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="phone" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newInstruct?.likedin} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-16 flex items-center">
                            <span>profession  -:</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="profession" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newInstruct?.profession} type="text" onChange={handleinputchange} />
                            </span>
                            <button className="border-2 border-purple-600 p-3" onClick={() => setShowPopup(true)}>update</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="absolute top-3/4 left-1/2">
                {showPopup && (
                    <Popup onConfirm={(e) => handleSubmit(e)} onCancel={() => setShowPopup(false)} message={"Do You Want To Update This Instructor ?"} />
                )}
                {showConfPopup && (
                    <ConfirmationPopup onCancel={() => setShowConfPopup(false)} confmessage={"Instructor info Updated successfully"} />
                )}
            </div>
        </div>
    )
}
export default SingleInstruct