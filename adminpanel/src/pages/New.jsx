import { useState } from "react"
import { makeRequest } from "../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmationPopup from "../Components/ConfirmationPopup";
import Popup from "../Components/Popup";

const New = () => {

    const queryClient = useQueryClient();

    const [Students, SetStudents] = useState({
        firstname: '', lastname: '', email: '', phone: '', password: '', username: '', paymentStatus: ''
    })
    const [selectedValue, setSelectedValue] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [showConfPopup, setShowConfPopup] = useState(false)
    const [errors, setErrors] = useState({});


    const validateForm = (name, lname, email, phone, username, password) => {
        let errors = {};

        if (!name) {
            errors.name = 'FirstName is required';
        }
        if (!lname) {
            errors.lname = 'last Name is required';
        }
        if (!email) {
            errors.email = 'email is required';
        }
        if (!phone) {
            errors.phone = 'Phone is required';
        }
        if (!username) {
            errors.username = 'UserName is required';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password should have at least 6 characters';
        }

        return errors;
    }

    //popup is set here
    const showConfirmationPopup = (event) => {
        event.preventDefault();
        const errors = validateForm(Students.firstName, Students.lastName, Students.email, Students.phone, Students.username, Students.password);
        if (Object.keys(errors).length === 0) {
            setShowPopup(true);
        } else {
            setErrors(errors);
            console.log(errors)
            setShowPopup(false);
        }
    };

    const addmutation = useMutation(
        (Studentsadd) => {
            return makeRequest.post("users/add", Studentsadd);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["chapters"]);
            },
        }
    );

    const handleValueChange = (event) => {
        setSelectedValue(event.target.value);
    }
    const handlechange = (e) => {
        SetStudents((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        Students.paymentStatus = selectedValue
        addmutation.mutate(Students)
        setShowPopup(false);
        setShowConfPopup(true)
    }
    return (<div className="flex dark:text-gray-400">
        <div className="flex-initial w-full h-fit ">
            <div className="shadow-md justify-center  p-10 pt-6 m-4 overflow-hidden text-gray-400 flex items-center text-xl font-bold">
                <span >ADD NEW STUDENT</span>
            </div>
            <div className="shadow-md   p-10 pt-6   sm:mx-20 flex items-center justify-start">
                <form className="flex flex-col w-full justify-center gap-14">
                    <div className="flex flex-col lg:flex-row lg:flex-wrap  justify-between w-full">
                        <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                            <label className="font-bold text-lg">Firstname</label>
                            <input name="firstName" className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full  rounded-md text-lg" type="text" placeholder="first_name" onChange={handlechange} />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                            <label className="font-bold text-lg">Lastname</label>
                            <input name="lastName" className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full  rounded-md text-lg" type="text" placeholder="last_name" onChange={handlechange} />
                            {errors.lname && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                            <label className="font-bold text-lg">Email</label>
                            <input name="email" className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full  rounded-md text-lg" type="text" placeholder="Someone@email.com" onChange={handlechange} />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                            <label className="font-bold text-lg">Password</label>
                            <input name="password" className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full  rounded-md text-lg" type="password" onChange={handlechange} />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                            <label className="font-bold text-lg">paymentStatus</label>
                            <select id="selectInput " value={selectedValue} onChange={handleValueChange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full  rounded-md text-lg" name="paymentStatus">
                                <option className="dark:bg-slate-900 text-lg text-center" value="free">free</option>
                                <option className="dark:bg-slate-900 text-lg text-center" value="premium">premium</option>
                            </select>
                        </div>
                        <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                            <label className="font-bold text-lg">Phone</label>
                            <input name="phone" className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full  rounded-md text-lg" type="string" placeholder="+251-" onChange={handlechange} />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                        <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                            <label className="font-bold text-lg">Username</label>
                            <input name="username" className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" placeholder="user_name" onChange={handlechange} />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>
                        <div className="flex-col flex items-start m-4 w-full lg:w-2/5">
                            <button className="bg-slate-400 dark:text-orange-600 dark:border-orange-600 text-slate-200  px-12 border-2 hover:shadow-sm hover:shadow-zinc-400 rounded-md hover:text-slate-100 dark:bg-slate-800 border-b-2  p-3 text-lg w-full" onClick={showConfirmationPopup}>Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className="absolute top-3/4 left-1/2">
            {showPopup && (
                <Popup onConfirm={(e) => handleSubmit(e)} onCancel={() => setShowPopup(false)} message={"Do You Want To Add This Student ?"} />
            )}
            {showConfPopup && (
                <ConfirmationPopup onCancel={() => setShowConfPopup(false)} confmessage={"Student Added successfully"} />
            )}
        </div>
    </div>

    )
}
export default New