import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const PopUp = ({setPopup}) => {
    return (
        <>
            <div class="sticky top-[200px] ml-2 lg:ml-[35%] opacity-100 ">
                <div className="absolute w-[400px] h-[400px] inset-[4px] bg-white dark:bg-black border p-[40px] rounded-lg flex flex-col" id="forgot">
                    <div className='w-full h-full relative ' id="forgotpassword">
                        <div className="flex text-center w-full justify-center">
                            <h2 className="text-black dark:text-white text-2xl  text-center tracking-widest flex flex-col px-4 py-14">This course can only be accessed with a premium membership.</h2>
                            <CloseIcon onClick={() => setPopup(false)} className='w-5 dark:text-white absolute right-4 cursor-pointer justify-end hover:text-orange-500 dark:hover:text-orange-500' />
                        </div>
                            
                            <div className='absolute justify-center bottom-0 left-[40%] '>
                    
                                <button className='px-8 py-3' onClick={() => setPopup(false)}>Exit</button>
                            </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopUp
