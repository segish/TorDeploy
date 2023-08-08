import React, { useContext } from 'react'
import "./login.css"
import { useState } from "react";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../context/AuthContext';
import { makeRequest } from '../axios';

const Register = ({ setRegister }) => {

    const { refreshLogin } = useContext(AuthContext)

    const [err, setErr] = useState(null)

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        otp: null
    });

    const submit3 = () => {
        setRegister(false)
        refreshLogin(true)
    }

    const checkInputs = (e) => {
        setErr(null)
        setInputs((perv) => ({ ...perv, [e.target.name]: e.target.value }));

        const usernameControler = document.getElementById('usernameControler');
        const passwordControler = document.getElementById('passwordControler');
        const emailControler = document.getElementById('emailControler');
        const firstNameControler = document.getElementById('firstNameControler');
        const lastNameControler = document.getElementById('lastNameControler');
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const email = document.getElementById('email');
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');


        const usernameValue = username.value.trim();
        const passwordValue = password.value;
        const emailValue = email.value.trim();
        const firstNameValue = firstName.value.trim();
        const lastNameValue = lastName.value.trim();


        if (usernameValue === '' || usernameValue === null) {
            usernameControler.classList.remove('success')
            usernameControler.classList.add('error')
        } else {
            usernameControler.classList.remove('error')
            usernameControler.classList.add('success')
        } if (passwordValue === '' || passwordValue === null) {
            passwordControler.classList.remove('success')
            passwordControler.classList.add('error')
            passwordControler.classList.remove('errors')
            const h62 = passwordControler.querySelector('h6');
            h62.innerText = "Please enter your password"
        } else if (passwordValue.length < 6) {
            passwordControler.classList.remove('success')
            passwordControler.classList.add('error')
            passwordControler.classList.add('errors')
            const h62 = passwordControler.querySelector('h6');
            h62.innerText = "Password must be at least 6 character"
        } else {
            passwordControler.classList.remove('errors')
            passwordControler.classList.remove('error')
            passwordControler.classList.add('success')
        }
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
        if (firstNameValue === '' || firstNameValue === null) {
            firstNameControler.classList.remove('success')
            firstNameControler.classList.add('error')
        } else {
            firstNameControler.classList.remove('error')
            firstNameControler.classList.add('success')
        }
        if (lastNameValue === '' || lastNameValue === null) {
            lastNameControler.classList.remove('success')
            lastNameControler.classList.add('error')
        } else {
            lastNameControler.classList.remove('error')
            lastNameControler.classList.add('success')
        }
    }

    const checkAllInputs = async (e) => {
        setErr(null)
        const usernameControler = document.getElementById('usernameControler')
        const passwordControler = document.getElementById('passwordControler')
        const emailControler = document.getElementById('emailControler')
        const firstNameControler = document.getElementById('firstNameControler')
        const lastNameControler = document.getElementById('lastNameControler')
        if (inputs.username === '') {
            usernameControler.classList.add('error');
        } else {
            usernameControler.classList.remove('error');
            usernameControler.classList.add('success');
        }
        if (inputs.password === '') {
            const h6 = passwordControler.querySelector('h6');
            passwordControler.classList.add('error');
            passwordControler.classList.remove('errors')
            h6.innerText = "Please enter your password"
        } else if (inputs.password.length < 6) {
            passwordControler.classList.remove('success')
            passwordControler.classList.add('error')
            passwordControler.classList.add('errors')
            const h62 = passwordControler.querySelector('h6');
            h62.innerText = "Password must be at least 6 character"
        } else {
            passwordControler.classList.remove('error');
            passwordControler.classList.remove('errors')
            passwordControler.classList.add('success');
        }
        if (inputs.email === '') {
            emailControler.classList.add('error');
        } else {
            emailControler.classList.remove('error');
            emailControler.classList.add('success');
        }
        if (inputs.firstName === '') {
            firstNameControler.classList.add('error');
        } else {
            firstNameControler.classList.remove('error');
            firstNameControler.classList.add('success');
        }
        if (inputs.lastName === '') {
            lastNameControler.classList.add('error');
        } else {
            lastNameControler.classList.remove('error');
            lastNameControler.classList.add('success');
            const loader = document.getElementById("loginloader");
            const logins = document.getElementById("loginprogress");
            logins.classList.add('hidden');
            loader.classList.remove('hidden');
            loader.classList.add('visible')
            try {
                const res = await makeRequest.post("auth/otp", inputs);
                if (res) {

                    const register = document.getElementById('register');
                    const otp = document.getElementById('otp');
                    register.className = 'register hidden';
                    otp.className = 'otp';
                    document.getElementById("otpbox").classList.add("h-[400px]")
                    document.getElementById("otpbox").classList.remove("h-[700px]")
                }
            } catch (err) {
                setErr(err.response.data);
            }
        }
    }
    //otpbox

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
        inputs.otp = otp.join("");
        console.log(inputs)
        console.log(otp)
        try {
            e.preventDefault();
            const res = await makeRequest.post("auth/register", inputs)
            if (res) {
                setRegister(false)
                refreshLogin(true)
            }
        } catch (err) {
            console.log(err.response.data)
            console.log(err)
            setErr(err.response.data)
        }

    }

    return (
        <>
            <div class="sticky top-8 ml-2 lg:ml-[35%] opacity-100 ">
                <div className="absolute w-[380px] h-[700px] inset-[4px] bg-white dark:border dark:bg-black p-[40px] rounded-lg flex flex-col" id="otpbox">
                    <div className=' ' id="register">
                        <div className="flex text-center w-full justify-center">
                            <h2 className="text-black dark:text-white text-xl  text-center tracking-widest flex flex-col">Sign up</h2>
                            <CloseIcon onClick={() => setRegister(false)} className='w-5 dark:text-white absolute right-4 cursor-pointer justify-end hover:text-orange-500 dark:hover:text-orange-500' />
                        </div>
                        <div class="relative w-[300px] mt-9" id="usernameControler">
                            <input className="relative w-full p-5 py-3 px-3 bg-transparent outline-none border-none tracking-wider text-black z-10 rounded h-11 mt-2"
                                type="text" name="username" id="username" onChange={checkInputs} />
                            <span className="absolute left-0 pointer-events-none text-[#8f8f8f] p-5 py-5 px-0 text-base tracking-wider duration-500">username</span>
                            <i className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 rounded overflow-hidden duration-500 pointer-events-none" id="i1"></i>
                            <ErrorOutlineOutlinedIcon className="erroricon absolute right-[2px] bottom-2 text-red-600 invisible" />
                            <h6 className="absolute left-0 top-12 bottom-[-15px] w-full text-red-600 invisible">Please enter your username</h6>
                        </div>
                        <div class="relative w-[300px] mt-9" id="passwordControler">
                            <input className="relative w-full p-5 py-3 px-3 bg-transparent outline-none border-none tracking-wider text-black z-10 rounded h-11 mt-2"
                                type="password" name="password" id="password" onChange={checkInputs} />
                            <span className="absolute left-0 pointer-events-none text-[#8f8f8f] p-5 py-5 px-0 text-base tracking-wider duration-500">password</span>
                            <i className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 rounded overflow-hidden duration-500 pointer-events-none" id="i2"></i>
                            <ErrorOutlineOutlinedIcon className="erroricon absolute right-[2px] bottom-2 text-red-600 invisible" />
                            <h6 className="absolute left-0 top-11 bottom-[-15px] w-full text-red-600 invisible">error message</h6>
                        </div>
                        <div class="relative w-[300px] mt-9" id="emailControler">
                            <input className="relative w-full p-5 py-3 px-3 bg-transparent outline-none border-none tracking-wider text-black z-10 rounded h-11 mt-2"
                                type="email" name="email" id="email" onChange={checkInputs} />
                            <span className="absolute left-0 pointer-events-none text-[#8f8f8f] p-5 py-5 px-0 text-base tracking-wider duration-500">email</span>
                            <i className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 rounded overflow-hidden duration-500 pointer-events-none" id="i3"></i>
                            <ErrorOutlineOutlinedIcon className="erroricon absolute right-[2px] bottom-2 text-red-600 invisible" />
                            <h6 className="absolute left-0 top-12 bottom-[-15px] w-full text-red-600 invisible">Please enter your email</h6>
                        </div>
                        <div class="relative w-[300px] mt-9" id="firstNameControler">
                            <input className="relative w-full p-5 py-3 px-3 bg-transparent outline-none border-none tracking-wider text-black z-10 rounded h-11 mt-2"
                                type="text" name="firstName" id="firstName" onChange={checkInputs} />
                            <span className="absolute left-0 pointer-events-none text-[#8f8f8f] p-5 py-5 px-0 text-base tracking-wider duration-500">first name</span>
                            <i className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 rounded overflow-hidden duration-500 pointer-events-none" id="i4"></i>
                            <ErrorOutlineOutlinedIcon className="erroricon absolute right-[2px] bottom-2 text-red-600 invisible" />
                            <h6 className="absolute left-0 top-12 bottom-[-15px] w-full text-red-600 invisible">Please enter your first name</h6>
                        </div>
                        <div class="relative w-[300px] mt-9" id="lastNameControler">
                            <input className="relative w-full p-5 py-3 px-3 bg-transparent outline-none border-none tracking-wider text-black z-10 rounded h-11 mt-2"
                                type="text" name="lastName" id="lastName" onChange={checkInputs} />
                            <span className="absolute left-0 pointer-events-none text-[#8f8f8f] p-5 py-5 px-0 text-base tracking-wider duration-500">last name</span>
                            <i className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 rounded overflow-hidden duration-500 pointer-events-none" id="i5"></i>
                            <ErrorOutlineOutlinedIcon className="erroricon absolute right-[2px] bottom-2 text-red-600 invisible" />
                            <h6 className="absolute left-0 top-12 bottom-[-15px] w-full text-red-600 invisible">Please enter your last name</h6>
                        </div>
                        <div className="mt-4 flex justify-between mb-4">

                            <span onClick={submit3} className="text-slate-600 text-xs m-3 hover:text-orange-500 cursor-pointer">
                                Sign in?
                            </span>
                        </div>
                        <div className="flex flex-col justify-end">
                            <button onClick={checkAllInputs} className=" mr-12 ml-12 py-3 justify-end" id="loginprogress">Register</button>
                            <div className="custom-loader w-24 m-6 ml-28 h-10 hidden" id='loginloader'></div>
                            {<div className="text-red-600 text-center h-10 text-lg">{err && err}</div>}

                        </div>

                    </div>

                    <div className="row hidden" id="otp">
                        <div className="col text-center justify-between gap-4">

                            <div className="flex text-center w-full justify-center">
                                <h2 className="text-black dark:text-white text-xl  text-center tracking-widest flex flex-col p-4">Enter the OTP sent to you to verify your identity</h2>
                                <CloseIcon onClick={() => setRegister(false)} className='w-5 dark:text-white absolute right-4 cursor-pointer justify-end hover:text-orange-500 dark:hover:text-orange-500' />
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
                                    onClick={e => setOtp([...otp.map(v => "")])}>
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
                </div>
            </div>
        </>
    )
}

export default Register;