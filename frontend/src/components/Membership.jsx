import React from 'react'
import CheckIcon from '@mui/icons-material/Check';

const Membership = () => {
  return (
    <div className='w-full text-white my-24 relative' id="mem">
        <div className='absolute mix-blend-overlay w-full h-[800px] bg-blue-950 dark:bg-zinc-800'> </div>

        <div className='max-w-[1240px] mx-auto py-12'>
            
            <div className='text-center py-8 text-slate-300'>
            <h1 className='text-4xl font-bold w-full text-black dark:text-white bg-orange-200 border border-orange-600 dark:bg-black rounded-md px-2 py-3'>Memberships</h1>
                <h3 className='text-5xl font-bold text-white py-8'>The right price for your Learning journey.</h3>
                <p className='text-3xl'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Qui nobis fugit facere earum laudantium quasi fugiat blanditiis maiores!
                    </p>
            </div>

            <div className='grid md:grid-cols-3'>
                
                <div className='bg-white  dark:bg-black text-slate-900 dark:text-white  m-4 p-8 rounded-xl shadow-2xl relative dark:border'>
                <div className='relative h-full w-full'>
                    <span className='uppercase px-3 py-1 bg-orange-200 text-orange-900 rounded-2xl text-sm'>Free</span>
                   <div>
                        <p className='text-6xl font-bold py-4 flex'>$0 <span className='text-xl text-slate-500 flex flex-col justify-end'>/mo</span></p>
                   </div>
                   <p className='text-2xl py-8 text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                   <div className='text-2xl relative'>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                   </div>
                   <div className='absolute bottom-0 w-full'>
                       <button className='w-full py-4 my-4'>Get Started</button>
                   </div>
                   </div>
                </div>

                <div className='bg-white dark:bg-black text-slate-900 dark:text-white m-4 p-8 rounded-xl shadow-2xl relative dark:border'>
                <div className='relative h-full w-full'>
                    <span className='uppercase px-3 py-1 bg-orange-200 text-orange-900 rounded-2xl text-sm'>Standard</span>
                   <div>
                        <p className='text-6xl font-bold py-4 flex'>$50 <span className='text-xl text-slate-500 flex flex-col justify-end'>/mo</span></p>
                   </div>
                   <p className='text-2xl py-8 text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                   <div className=' text-2xl'>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        </div>
                        <div className='absolute bottom-0 w-full mt-8'>
                       <button className='w-full py-4 my-4'>Get Started</button>
                   </div>
                       </div>
                </div>

                <div className='bg-white dark:bg-black  text-slate-900 dark:text-white  m-4 p-8 rounded-xl shadow-2xl relative dark:border'>
                    <div className='relative h-full w-full'>
                    <span className='uppercase px-3 py-1 bg-orange-200 text-orange-900 rounded-2xl text-sm'>Premium</span>
                   <div>
                        <p className='text-6xl font-bold py-4 flex'>$100 <span className='text-xl text-slate-500 flex flex-col justify-end'>/mo</span></p>
                   </div>
                   <p className='text-2xl py-8 text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                   <div className='text-2xl relative'>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'/> Lorem, ipsum dolor sit.</p>
                        </div>
                        <div className='absolute bottom-0 w-full'>
                       <button className='w-full py-4 my-4'>Get Started</button>
                   </div>
                        </div>
                </div>
                


            </div>

        </div>
    </div>
  )
}

export default Membership
