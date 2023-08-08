import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const OTPBox = () => {
    const [otp, setOtp] = useState(new Array(4).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const checkInputs = (e) => {
        setOtp((perv) => ({ ...perv, [e.target.name]: e.target.value }));


        const otpControler = document.getElementById('otpControler');
        const otp = document.getElementById('otp');



        if (otp === '' || otp === null) {
            otpControler.classList.remove('success')
            otpControler.classList.add('error')
            const h6 = otpControler.querySelector('h6');
            h6.innerText = "Please enter your otp"
        }
        else {
            otpControler.classList.remove('error')
            otpControler.classList.add('success')
        }

    }

    return (
        <>
            <div class="sticky top-[200px] ml-2 lg:ml-[35%] opacity-100 ">
                <div className="absolute w-[380px] h-[350px] inset-[4px] bg-white dark:bg-black dark:border dark:text-white p-[40px] rounded-lg flex flex-col">
                    <div className="row">
                        <div className="col text-center justify-between gap-4">

                            <div className="flex text-center w-full justify-center">
                                <h2 className="text-black dark:text-white text-xl  text-center tracking-widest flex flex-col p-4">Enter the OTP sent to you to verify your identity</h2>
                                <CloseIcon className='w-5 dark:text-white absolute right-4 cursor-pointer justify-end hover:text-orange-500 dark:hover:text-orange-500' />
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
                                <p>OTP Entered - {otp.join("")}</p>

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
                                    onClick={() => checkInputs}
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OTPBox;