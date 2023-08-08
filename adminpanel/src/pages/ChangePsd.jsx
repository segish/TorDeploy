import { makeRequest } from '../axios';
import { useState } from "react";
import Popup from '../Components/Popup';
import ConfirmationPopup from '../Components/ConfirmationPopup';

const ChangePsd = () => {

    const [Passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', ConfPsd: '' })

    const [errors, setErrors] = useState({ oldPsd: '', newPsd: '', ConfPsd: '', validate: '', validateNew: '' });
    const [Err, setErr] = useState();
    const [showConfPopup, setShowConfPopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);


    const showchangePopup = (e) => {
        e.preventDefault();
        setErr(null)
        const errors = validateForm(Passwords.oldPassword, Passwords.newPassword, Passwords.ConfPsd);
        if (Object.keys(errors).length === 0) {
            e.preventDefault()
            setErrors('')
            setShowPopup(true);
        }
        else {
            setErrors(errors);
        }
    };

    const validateForm = (oldPsd, newPsd, ConfPsd) => {
        let errors = {};
        if (!oldPsd) {
            errors.oldPsd = 'PLease enter your old password';
        }
        if (!newPsd) {
            errors.newPsd = 'PLease enter your new password';
        }
        if (!ConfPsd) {
            errors.ConfPsd = 'PLease enter your confirmation password ';
        }

        if (newPsd === oldPsd) {
            errors.validate = "Password must be different from old password"
        }
        if (newPsd !== ConfPsd) {
            errors.validateNew = "Passwords don't match"
        }

        return errors;
    }
    const handlechange = (e) => {
        setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
            try {
                const res = await makeRequest.post("auth/pwdchange", Passwords)
                console.log(res)
                setShowPopup(false)
                setShowConfPopup(true)
            }
            catch (err) {
                setErr(err.response.data)
                setShowPopup(false)
            }
    }

    return (

        <div className="flex dark:text-gray-400">
            <div className="flex-initial w-full h-fit ">
                <div className="p-7 flex items-center justify-center">
                    <label className="font-bold text-lg lg:text-2xl dark:text-gray-400  ">Change Admin Password</label>
                </div>
                <div className="shadow-md   p-10 pt-6   sm:mx-20 flex items-center justify-start ">
                    <form className="flex flex-col w-full justify-center gap-14 items-center">
                        <div className="flex-col flex items-start  w-full lg:w-2/5">
                            <div className="flex-col flex items-start w-full ">
                                <label className="font-bold lg:text-lg dark:text-gray-400   py-2">Old Password</label>
                                <input name="oldPassword" id="oldpwd" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" placeholder="Enter Old Password" />
                                {errors.oldPsd && <p className="text-red-500 text-sm">{errors.oldPsd}</p>}
                            </div>
                            <div className="flex-col flex items-start w-full ">
                                <label className="font-bold lg:text-lg dark:text-gray-400   py-2">New Password</label>
                                <input name="newPassword" id="newpwd" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" placeholder="Enter New Password" />
                                {errors.newPsd && <p className="text-red-500 text-sm">{errors.newPsd}</p>}
                                {errors.validate && <p className="text-red-500 text-sm">{errors.validate}</p>}

                            </div>
                            <div className="flex-col flex items-start w-full ">
                                <label className="font-bold lg:text-lg dark:text-gray-400   py-2">Confirm  Password</label>
                                <input name="ConfPsd" id="confpwd" onChange={handlechange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" type="text" placeholder="Confirm  New Password" />
                                {errors.ConfPsd && <p className="text-red-500 text-sm">{errors.ConfPsd}</p>}
                                {errors.validateNew && <p className="text-red-500 text-sm">{errors.validateNew}</p>}
                            </div>
                        </div>
                        {<div className="text-red-600 text-center text-lg">{Err && Err}</div>}
                        <div className="p-7 px-20">
                            <button className="h-16 bg-slate-400 dark:text-orange-600 dark:bg-slate-800 dark:border-orange-600 text-slate-200  p-3 w-[200px] px-12 border-2 hover:shadow-md hover:text-slate-100 rounded-md" onClick={showchangePopup}>
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="absolute top-1/3 left-1/3">
                {showPopup && (
                    <Popup onConfirm={(e) => handleSubmit(e)} onCancel={() => setShowPopup(false)} message={"Do You Want To change your password ?"} />
                )}
                {showConfPopup && (
                    <ConfirmationPopup onCancel={() => setShowConfPopup(false)} confmessage={"password changed successfully"} />
                )}

            </div>
        </div>
    )
}
export default ChangePsd