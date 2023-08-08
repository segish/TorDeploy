import EditIcon from '@mui/icons-material/Edit';
import OIP from "../assets/man.jpg"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from '../axios';
import Popup from '../Components/Popup';
import ConfirmationPopup from '../Components/ConfirmationPopup';

const SingleStudents = () => {

    const queryClient = useQueryClient();

    const userId = useLocation().pathname.split("/")[2]


    const [student, setStudent] = useState();

    const [newstudent, setnewStudent] = useState();
    
    const [showPopup, setShowPopup] = useState(false);
    const [showConfPopup, setShowConfPopup] = useState(false)

    //popup is set here
    const showConfirmationPopup = (event) => {
        event.preventDefault();
        setShowPopup(true);
    };

    const { data } = useQuery(["singlestudents"], () =>
        makeRequest.get("users/" + userId).then((res) => {
            return res.data || null;
        })
    );
    const [selectedValue, setSelectedValue] = useState(data?.paymentStatus);

    const mutation = useMutation(
        (updatecourse) => {
            return makeRequest.post("users/update/" + userId, updatecourse);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["singlestudents"]);
                queryClient.invalidateQueries(["students"]);
            },
        }
    );

    useEffect(() => {
        queryClient.invalidateQueries(["singlestudents"]);
    }, [userId, queryClient]);

    useEffect(() => {
        setnewStudent(data)
        // setSelectedValue(data?.paymentStatus)
    }, [data])

    const handleinputchange = (e) => {
        setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleValueChange = (event) => {
        setSelectedValue(event.target.value);
        setStudent((prev) => ({ ...prev, paymentStatus: event.target.value }))
        // console.log(student.paymentStatus)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        mutation.mutate(student)
        console.log(student)
        setShowPopup(false)
        setShowConfPopup(true)
    }


    return (
        <div className="flex dark:text-gray-200">
            <div className="flex-initial w-full ">
                <div className="p-8 mx-10 md:mx flex items-center gap-7">
                    <img src={OIP} className="rounded-full h-20 w-20" alt="OTP" />
                    <p className="md:text-5xl text-xl text-gray-600">User Profile</p>
                </div>
                <div className=" shadow-sm rounded-md shadow-black p-4 md:p-10 pt-6 m-6 mx-12 text-gray-600 flex justify-between dark:shadow-md dark:shadow-slate-800">
                    <div className="gap-14 flex items-center w-300 md:w-fit">
                        <span>Username :</span>
                        <span className="italic md:text-xl text-md ">
                            <input name="username" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newstudent?.username} type="text" onChange={handleinputchange} />
                        </span>
                    </div>
                    <div className="gap-2 flex cursor-pointer text-orange-600" >
                        <EditIcon />
                        edit
                    </div>
                </div>
                <div className="overflow-hidden shadow-sm rounded-md shadow-black p-4 md:p-10  mx-12 m-6 text-gray-600 flex-col justify-between gap-3  dark:shadow-lg dark:shadow-slate-800">
                    <div className="items-center">
                        <div className="py-5 gap-16 flex items-center">
                            <span>First Name :</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="firstName" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newstudent?.firstName} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-16 flex items-center">
                            <span>Last Name :</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="lastName" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newstudent?.lastName} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-24 flex items-center">
                            <span>Email :</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="email" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newstudent?.email} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-20 flex items-center">
                            <span>Phone  -:</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <input name="phone" className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200" defaultValue={newstudent?.phone} type="text" onChange={handleinputchange} />
                            </span>
                        </div>
                        <div className="py-5 gap-14 flex items-center">
                            <span>Payment Stat</span>
                            <span className="italic p-2 text-xl border-dotted border-2 border-gray-800  sm:w[300px] w-8/12 rounded-md">
                                <select id="selectInput" name="paymentStatus" value={selectedValue} onChange={handleValueChange} className="dark:bg-slate-700 h-full w-full rounded-md p-2 dark:text-gray-200">
                                    <option className="dark:bg-slate-900" value="free">free</option>
                                    <option className="dark:bg-slate-900" value="premium">premium</option>
                                </select>
                            </span>
                            <button className="border-2 border-purple-600 p-3" onClick={showConfirmationPopup}>update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-3/4 left-1/2">
                {showPopup && (
                    <Popup onConfirm={(e) => handleSubmit(e)} onCancel={() => setShowPopup(false)} message={"Do You Want To Update This Student ?"} />
                )}
                {showConfPopup && (
                    <ConfirmationPopup onCancel={() => setShowConfPopup(false)} confmessage={"Student info Updated successfully"} />
                )}
            </div>
        </div>

    )
}
export default SingleStudents