import "./login.css"
import logo from "../assets/logo.png"
import { useState, useContext } from "react";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { makeRequest } from "../axios";
const Login = () => {

    const navigate = useNavigate();

    const { refreshUser } = useContext(AuthContext)

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [err, setErr] = useState(null)

    const checkInputs = (e) => {
        setInputs((perv) => ({ ...perv, [e.target.name]: e.target.value }));

        const usernameControler = document.getElementById('usernameControler');
        const passwordControler = document.getElementById('passwordControler');
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        const usernameValue = username.value.trim();
        const passwordValue = password.value;
        if (usernameValue === '' || usernameValue === null) {
            const h6 = usernameControler.querySelector('h6');
            usernameControler.className = 'inputBox error';
            h6.innerText = "Please enter your username"
        } else {
            usernameControler.className = 'inputBox success';
        } if (passwordValue === '' || passwordValue === null) {
            const h62 = passwordControler.querySelector('h6');
            passwordControler.className = 'inputBox error';
            h62.innerText = "Please enter your password"
        } else {
            passwordControler.className = 'inputBox success';
        }
    }
    const checkAllInputs = async () => {
        const usernameControler = document.getElementById('usernameControler')
        const passwordControler = document.getElementById('passwordControler')
        if (inputs.email === '') {
            const h6 = usernameControler.querySelector('h6');
            usernameControler.className = 'inputBox error';
            h6.innerText = "Please enter your username"
        } else {
            usernameControler.className = 'inputBox success';
        }
        if (inputs.password === '') {
            const h6 = passwordControler.querySelector('h6');
            passwordControler.className = 'inputBox error';
            h6.innerText = "Please enter your password"
        } else {
            passwordControler.className = 'inputBox success';
            const loader = document.getElementById("loginloader");
            const logins = document.getElementById("loginprogress");
            logins.classList.add('hidden');
            loader.classList.remove('hidden');
            loader.classList.add('visible')
            try {
                const res = await makeRequest.post("auth/login", inputs)
                refreshUser(res.data || null)
                localStorage.setItem("user", JSON.stringify(res.data || null))
                navigate("/")
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
        <div className="dark:bg-slate-900 bg-slate-950 flex justify-center  items-center  h-screen">
            <div class="box">
                <span class="borderlinel"></span>

                <div className="form flex flex-col justify-between">
                    <img src={logo} alt="" />
                    <h2>Sign in</h2>
                    <div class="inputBox" id="usernameControler">
                        <input type="text" name="email" id="username" className="h-11 bg-black rounded-lg" onChange={checkInputs} />
                        <span>email</span>
                        <i></i>
                        <ErrorOutlineOutlinedIcon className="erroricon z-50" />
                        <CheckCircleOutlineOutlinedIcon className="successicon z-50" />
                        <h6>eror message</h6>
                    </div>
                    <div class="inputBox" id="passwordControler">
                        <input type="password" name="password" id="password" className="h-11 bg-black rounded-lg" onChange={checkInputs} />
                        <span>password</span>
                        <i></i>
                        <ErrorOutlineOutlinedIcon className="erroricon z-50" />
                        <CheckCircleOutlineOutlinedIcon className="successicon z-50" />
                        <h6>eror message</h6>
                    </div>
                    <div class="submit w-full flex flex-col mt-16 items-center">
                        <button onClick={checkAllInputs} className="" id="loginprogress">Login</button>
                        <div className="custom-loader hidden" id='loginloader'></div>
                        {<div className="text-red-600 text-center h-10 text-lg">{err && err}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login