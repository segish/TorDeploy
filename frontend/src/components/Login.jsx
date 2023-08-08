import "./login.css"
import { useContext, useState } from "react";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { makeRequest } from '../axios';
import { AuthContext } from "../context/AuthContext";

const Login = ({setRegister,setForgot}) => {
    const { refreshLogin} = useContext(AuthContext)

    const { refreshUser} = useContext(AuthContext)
    const [err,setErr] = useState(null)

    const [inputs,setInputs] = useState({
        email: "",
        password: "",
      });

      const submit1 = () =>{
        setForgot(true)
        refreshLogin(false)
      }

      const submit2 = () =>{
        setRegister(true)
        refreshLogin(false)
      }

    const checkInputs = (e) => {
        setErr(null)
        setInputs((perv) => ({...perv,[e.target.name]: e.target.value}));

        const usernameControler = document.getElementById('usernameControler');
        const passwordControler = document.getElementById('passwordControler');
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        
        const usernameValue = username.value.trim();
        const passwordValue = password.value;
        if(usernameValue=== ''||usernameValue===null){
            usernameControler.classList.remove('success')
            usernameControler.classList.add('error')
        }else{
            usernameControler.classList.remove('error')
            usernameControler.classList.add('success')
        }if(passwordValue=== ''||passwordValue===null){
            passwordControler.classList.remove('success')
            passwordControler.classList.add('error')
            passwordControler.classList.remove('errors')
            const h62 = passwordControler.querySelector('h6');
            h62.innerText = "Please enter your password"
        }else if(passwordValue.length<6){
            passwordControler.classList.remove('success')
            passwordControler.classList.add('error')
            passwordControler.classList.add('errors')
            const h62 = passwordControler.querySelector('h6');
            h62.innerText = "Password must be at least 6 character"
        }else{
            passwordControler.classList.remove('errors')
            passwordControler.classList.remove('error')
            passwordControler.classList.add('success')
        }
    }
    const checkAllInputs = async () =>{
        setErr(null)
        const usernameControler = document.getElementById('usernameControler')
        const passwordControler = document.getElementById('passwordControler')
        if(inputs.email=== ''){
            usernameControler.classList.add('error');
        }else{
            usernameControler.classList.remove('error');
            usernameControler.classList.add('success');
        } 
        if(inputs.password=== ''){
            const h6 = passwordControler.querySelector('h6');
            passwordControler.classList.add('error');
            passwordControler.classList.remove('errors')
            h6.innerText = "Please enter your password"
        }else if(inputs.password.length<6){
            passwordControler.classList.remove('success')
            passwordControler.classList.add('error')
            passwordControler.classList.add('errors')
            const h62 = passwordControler.querySelector('h6');
            h62.innerText = "Password must be at least 6 character"
        }else{
            const loader = document.getElementById("loginloader");
            const logins = document.getElementById("loginprogress");
            logins.classList.add('hidden');
            loader.classList.remove('hidden');
            loader.classList.add('visible')
            try {
                const res = await makeRequest.post("auth/login", inputs)
                localStorage.setItem("user", JSON.stringify(res.data))
                refreshUser(res.data)
                refreshLogin(false)

            } catch (err) {
                console.log(err.response.data)
                setErr(err.response.data)
                logins.classList.remove('hidden');
                logins.classList.add('visible');
                loader.classList.remove('visible');
                loader.classList.add('hidden')
            } 
        } 
    }
    return (
        <div class="sticky top-1/4 ml-2 lg:ml-[35%] opacity-100 ">
            <div className="absolute w-[380px] h-[488px] inset-[4px] bg-white dark:border dark:bg-black p-[40px] rounded-lg flex flex-col">
                <div className="flex text-center w-full justify-center">
                <h2 className="text-black dark:text-white text-xl  text-center tracking-widest flex flex-col">Sign in</h2>
                <CloseIcon onClick={()=>refreshLogin(false)} className='w-5 dark:text-white absolute right-4 cursor-pointer justify-end hover:text-orange-500 dark:hover:text-orange-500'/> 
                </div>
                <div class="relative w-[300px] mt-9" id="usernameControler">
                    <input className="relative w-full p-5 py-3 px-3 bg-transparent outline-none border-none tracking-wider text-black z-10 rounded h-11 mt-2" 
                    type="text" name="email" id="username" onChange={checkInputs}/>
                    <span className="absolute left-0 pointer-events-none text-[#8f8f8f] p-5 py-5 px-0 text-base tracking-wider duration-500">email</span>
                    <i className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 rounded overflow-hidden duration-500 pointer-events-none" id="i1"></i>
                    <ErrorOutlineOutlinedIcon className="erroricon absolute right-[2px] bottom-2 text-red-600 invisible"/>
                    {/* <CheckCircleOutlineOutlinedIcon  className="successicon absolute right-[2px] bottom-2 text-green-500 invisible"/> */}
                    <h6 className="absolute left-0 top-12 bottom-[-15px] w-full text-red-600 invisible">Please enter your email</h6>
                </div>
                <div class="relative w-[300px] mt-9" id="passwordControler">
                    <input className="relative w-full p-5 py-3 px-3 bg-transparent outline-none border-none tracking-wider text-black z-10 rounded h-10 mt-2" 
                    type="password" name="password" id="password" onChange={checkInputs}/>
                    <span className="absolute left-0 pointer-events-none text-[#8f8f8f] p-5 py-5 px-0 text-base tracking-wider duration-500">password</span>
                    <i className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 rounded overflow-hidden duration-500 pointer-events-none" id="i2"></i>
                    <ErrorOutlineOutlinedIcon className="erroricon absolute right-[2px] bottom-2 text-red-600 invisible"/>
                    {/* <CheckCircleOutlineOutlinedIcon  className="successicon absolute right-[2px] bottom-2 text-green-500 invisible"/> */}
                    <h6 className="absolute left-0 top-11 bottom-[-15px] w-full text-red-600 invisible">error message</h6>
                </div>
                <div className="mt-4 flex justify-between mb-4">
                    <span  onClick={submit1} className="text-slate-600 text-xs m-3 hover:text-orange-500 cursor-pointer">
                        Forgot password?
                    </span>
                    <span onClick={submit2} className="text-slate-600 text-xs m-3 hover:text-orange-500 cursor-pointer">
                        Signup
                    </span>
                </div>
                <div className="flex flex-col justify-end">
                <button onClick={checkAllInputs} className="w-24 m-6 ml-24 h-10" id="loginprogress">Login</button>
                <div className="custom-loader w-24 m-6 ml-28 h-10 hidden" id='loginloader'></div>
                {<div className="text-red-600 text-center h-10 text-lg">{err&&err}</div>}
                </div>
            </div>
        </div>
      )
    }
    
    export default Login