import React, { useContext } from 'react'
import "./login.css"
import { useState } from "react";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
//import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../context/AuthContext';
import { makeRequest } from '../axios';

const ForgotPassword = ({ setForgot }) => {
    const { refreshLogin } = useContext(AuthContext)

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const [err, setErr] = useState(null)

    const submitse1 = () => {
        setForgot(false)
        refreshLogin(true)
    }
    const [inputs, setInputs] = useState({
        password1: "",
        password2: "",
        email: "",
    });

    const checkInputs = (e) => {
        setErr(null)
        setInputs((perv) => ({ ...perv, [e.target.name]: e.target.value }));

        const emailControler = document.getElementById('emailControler');
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const passwordControler1 = document.getElementById('passwordControler1');
        const password1Value = email.value.trim();
        const passwordControler2 = document.getElementById('passwordControler2');
        const password2Value = email.value.trim();

        if (emailValue === '' || emailValue === null) {
            emailControler.classList.remove('success')
            emailControler.classList.add('error')
            const h63 = emailControler.querySelector('h6');
            h63.innerText = "Please enter your email"
        } else if (!validateEmail(emailValue)) {
            emailControler.classList.remove('success')
            emailControler.classList.add('error')
            const h63 = emailControler.querySelector('h6');
            h63.innerText = "Please enter valid email"
        }
        else {
            emailControler.classList.remove('error')
            emailControler.classList.add('success')
        }
        if (password1Value === '' || password1Value === null) {
            passwordControler1.classList.remove('success')
            passwordControler1.classList.add('error')
            passwordControler1.classList.remove('errors')
            const h62 = passwordControler1.querySelector('h6');
            h62.innerText = "Please enter your new password"
        } else if (password1Value.length < 6) {
            passwordControler1.classList.remove('success')
            passwordControler1.classList.add('error')
            passwordControler1.classList.add('errors')
            const h62 = passwordControler1.querySelector('h6');
            h62.innerText = "Password must be at least 6 character"
        } else {
            passwordControler1.classList.remove('errors')
            passwordControler1.classList.remove('error')
            passwordControler1.classList.add('success')
        }if (password2Value === '' || password2Value === null) {
            passwordControler2.classList.remove('success')
            passwordControler2.classList.add('error')
            passwordControler2.classList.remove('errors')
            const h62 = passwordControler2.querySelector('h6');
            h62.innerText = "Please confirm your password"
        } else if (password2Value.length < 6) {
            passwordControler2.classList.remove('success')
            passwordControler2.classList.add('error')
            passwordControler2.classList.add('errors')
            const h62 = passwordControler2.querySelector('h6');
            h62.innerText = "Password must be at least 6 character"
        } else {
            passwordControler2.classList.remove('errors')
            passwordControler2.classList.remove('error')
            passwordControler2.classList.add('success')
        }
    }

    const checkAllInputsp = async() => {
        setErr(null)
        const passwordControler1 = document.getElementById('passwordControler1')
        const passwordControler2 = document.getElementById('passwordControler2')
        if(inputs.password2 !== inputs.password1 ){
            setErr("Entered passwords do not match!")
           }else{
        if (inputs.password1 === '') {
            const h6 = passwordControler1.querySelector('h6');
            passwordControler1.classList.add('error');
            passwordControler1.classList.remove('errors')
            h6.innerText = "Please enter your password"
        } else if (inputs.password1.length < 6) {
            passwordControler1.classList.remove('success')
            passwordControler1.classList.add('error')
            passwordControler1.classList.add('errors')
            const h62 = passwordControler1.querySelector('h6');
            h62.innerText = "Password must be at least 6 character"
        }else {
            passwordControler1.classList.remove('error');
            passwordControler1.classList.remove('errors')
            passwordControler1.classList.add('success');
            
        } if (inputs.password2 === '') {
            const h6 = passwordControler2.querySelector('h6');
            passwordControler2.classList.add('error');
            passwordControler2.classList.remove('errors')
            h6.innerText = "Please enter your password"
        } else if (inputs.password2.length < 6) {
            passwordControler2.classList.remove('success')
            passwordControler2.classList.add('error')
            passwordControler2.classList.add('errors')
            const h62 = passwordControler2.querySelector('h6');
            h62.innerText = "Password must be at least 6 character"
        }
        
        else {
            passwordControler2.classList.remove('error');
            passwordControler2.classList.remove('errors')
            passwordControler2.classList.add('success');
            try {
               
                const res = await makeRequest.post("auth/reset-password",inputs);
                    if(res){
                        setForgot(false)
                        refreshLogin(true)
                const gotoOtp = document.getElementById('gotoOtp');
                    gotoOtp.className = 'gotoOtp hidden';
                    }

            } catch (err) {
                setErr(err.response.data);
                
            }
        }
    }
    }


    const checkAllInputse = async() => {
        setErr(null)
        const emailControler = document.getElementById('emailControler')

        if (inputs.email === '') {
            emailControler.classList.add('error');
        } else {
            emailControler.classList.remove('error');
            emailControler.classList.add('success');
            const loader = document.getElementById("loginloader");
            const logins = document.getElementById("loginprogress");
            logins.classList.add('hidden');
            loader.classList.remove('hidden');
            loader.classList.add('visible')
            try {
                const res = await makeRequest.post("auth/forgot",inputs)
                
                if (res) {
                    console.log(inputs.email)

                    
                    const forgotpassword = document.getElementById('forgotpassword');
                    const gotoOtp = document.getElementById('gotoOtp');
                    
                    forgotpassword.className = 'forgotpassword hidden';
                    gotoOtp.className = 'gotoOtp';
                    
                }
            } catch (err) {
                setErr(err.response.data);
                logins.classList.remove('hidden');
                logins.classList.add('visible');
                loader.classList.remove('visible');
                loader.classList.add('hidden')
            }
        }
    }

    const [otp, setOtp] = useState(new Array(4).fill(null));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };



   

    const checkInputs2 = async (e) => {
        setErr(null)
         inputs.otp=parseInt(otp.join(""));
         console.log(inputs)
        console.log(typeof otp.join(""))
        try {
            e.preventDefault(); 
            const res = await makeRequest.post("auth/verify", inputs)
            if (res) {
                const resetpassword = document.getElementById('resetpassword');
                const gotoOtp = document.getElementById('gotoOtp');
                resetpassword.className = 'resetpassword';
                gotoOtp.className = 'gotoOtp hidden';
                document.getElementById("forgot").classList.add("h-[510px]")
                    document.getElementById("forgot").classList.remove("h-[400px]")
           }
        } catch (err) {
            console.log(err.response.data)
            console.log(err)
            setErr(err.response.data)
        }
    }

    return (
        <div class="sticky top-[200px] ml-2 lg:ml-[35%] opacity-100 ">
            <div className="absolute w-[380px] h-[400px] inset-[4px] bg-white dark:bg-black dark:border p-[40px] rounded-lg flex flex-col" id="forgot">
                <div className=' ' id="forgotpassword">
                    <div className="flex text-center w-full justify-center">
                        <h2 className="text-black dark:text-white text-xl  text-center tracking-widest flex flex-col p-4">Enter your email to change your password</h2>
                        <CloseIcon onClick={() => setForgot(false)} className='w-5 dark:text-white absolute right-4 cursor-pointer justify-end hover:text-orange-500 dark:hover:text-orange-500' />
                    </div>
                    <div class="relative w-[300px] mt-9" id="emailControler">
                        <input className="relative w-full p-5 py-3 px-3 bg-transparent outline-none border-none tracking-wider text-black z-10 rounded h-11 mt-2"
                            type="email" name="email" id="email" onChange={checkInputs} />
                        <span className="absolute left-0 pointer-events-none text-[#8f8f8f] p-5 py-5 px-0 text-base tracking-wider duration-500">email</span>
                        <i className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 rounded overflow-hidden duration-500 pointer-events-none" id="i3"></i>
                        <ErrorOutlineOutlinedIcon className="erroricon absolute right-[2px] bottom-2 text-red-600 invisible" />
                        <h6 className="absolute left-0 top-12 bottom-[-15px] w-full text-red-600 invisible">Please enter your email</h6>
                    </div>

                    <div className="mt-4 flex justify-between mb-4">

                        <span onClick={submitse1} className="text-slate-600 text-xs mt-4 hover:text-orange-500 cursor-pointer">
                            Sign in?
                        </span>

                    </div>
                    <div className="flex flex-col justify-end">
                        <button onClick={checkAllInputse} className=" mr-12 ml-12 py-3 justify-end" id="loginprogress">Enter</button>
                        <div className="custom-loader w-24 m-6 ml-28 h-10 hidden" id='loginloader'></div>
                    </div>
                    {<div className="text-red-600 text-center h-10 mt-4 text-lg">{err && err}</div>}
                </div>
                
                <div className="row hidden" id="gotoOtp">
                        <div className="col text-center justify-between gap-4">

                            <div className="flex text-center w-full justify-center">
                                <h2 className="text-black dark:text-white text-xl  text-center tracking-widest flex flex-col p-4">Enter the OTP sent to you to verify your identity</h2>
                                <CloseIcon onClick={() => setForgot(false)} className='w-5 dark:text-white absolute right-4 cursor-pointer justify-end hover:text-orange-500 dark:hover:text-orange-500' />
                            </div>
                            <div class="relative w-[300px] mt-9" id="otpControler">
                                <div className="flex gap-2 justify-center m-4">
                                    {otp.map((data, index) => {
                                        return (
                                            <input
                                                className="otp-field flex text-center text-black h-8 w-5 border border-black gap-4 rounded"
                                                type="text"
                                                name="otp"
                                                id="otp"
                                                maxLength="1"
                                                key={index}
                                                value={data}
                                                onChange={e => handleChange(e.target, index)}
                                                onFocus={e => e.target.select()}
                                            />
                                        );
                                    })}
                                </div>


                                <p className='dark:text-white'>OTP Entered - {otp.join("")}</p>

                                <h6 className=" w-full text-red-600 hidden">Please enter your email</h6>
                            </div>
                            <div className="flex mt-4 justify-between">
                                <button
                                    className="btn btn-secondary  px-4 py-2"
                                    onClick={e => setOtp([...otp.map(v => "")])}
                                >
                                    Clear
                                </button>
                                <button
                                    className="btn btn-primary px-4 py-2"
                                    onClick={checkInputs2}
                                >
                                    Verify OTP
                                </button>
                            </div>
                            {<div className="text-red-600 flex justify-center p-4 text-center h-10 text-lg">{err && err}</div>}
                        </div>
                    </div>
                    {/* resetpassword*/}
                    <div className='hidden ' id="resetpassword">
                    <div className="flex text-center w-full justify-center">
                        <h2 className="text-black dark:text-white text-xl  text-center tracking-widest flex flex-col p-4">Reset your old password by entering your new password</h2>
                        <CloseIcon onClick={() => setForgot(false)} className='w-5 dark:text-white absolute right-4 cursor-pointer justify-end hover:text-orange-500 dark:hover:text-orange-500' />
                    </div>
                    <div class="relative w-[300px] mt-9" id="passwordControler1">
                            <input className="relative w-full p-5 py-3 px-3 bg-transparent outline-none border-none tracking-wider text-black z-10 rounded"
                                type="password" name="password1" id="password1" onChange={checkInputs} />
                            <span className="absolute left-0 pointer-events-none text-[#8f8f8f] p-5 py-5 px-0 text-base tracking-wider duration-500">New password</span>
                            <i className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 rounded overflow-hidden duration-500 pointer-events-none" id="i2"></i>
                            <ErrorOutlineOutlinedIcon className="erroricon absolute right-[2px] bottom-2 text-red-600 invisible" />
                            {/* <CheckCircleOutlineOutlinedIcon className="successicon absolute right-[2px] bottom-2 text-green-500 invisible" /> */}
                            <h6 className="absolute left-0 top-11 bottom-[-15px] w-full text-red-600 invisible">error message</h6>
                        </div>
                        <div class="relative w-[300px] mt-9" id="passwordControler2">
                            <input className="relative w-full p-5 py-3 px-3 bg-transparent outline-none border-none tracking-wider text-black z-10 rounded"
                                type="password" name="password2" id="password2" onChange={checkInputs} />
                            <span className="absolute left-0 pointer-events-none text-[#8f8f8f] p-5 py-5 px-0 text-base tracking-wider duration-500">Confirm password</span>
                            <i className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 rounded overflow-hidden duration-500 pointer-events-none" id="i2"></i>
                            <ErrorOutlineOutlinedIcon className="erroricon absolute right-[2px] bottom-2 text-red-600 invisible" />
                            {/* <CheckCircleOutlineOutlinedIcon className="successicon absolute right-[2px] bottom-2 text-green-500 invisible" /> */}
                            <h6 className="absolute left-0 top-11 bottom-[-15px] w-full text-red-600 invisible">error message</h6>
                        </div>

                    <div className="mt-4 flex justify-between mb-4">

                        <span onClick={submitse1} className="text-slate-400 text-xs mt-4 hover:text-orange-500 cursor-pointer">
                            Sign in?
                        </span>

                    </div>
                    <div className="flex flex-col justify-end">
                        <button onClick={checkAllInputsp} className=" mr-12 ml-12 py-3 justify-end">Enter</button>
                    </div>
                    {<div className="text-red-600 text-center h-10 mt-4 text-lg">{err && err}</div>}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
