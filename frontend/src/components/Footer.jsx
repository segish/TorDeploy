import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='flex flex-col border-t-2 bottom-0 mb-0'>
      <div className='w-full  bg-blue-950 dark:bg-black py-16 px-4 grid sm:grid-cols-1 lg:grid-cols-2 gap-8 text-gray-300 '>
        <div className=''>
          <div className='flex flex-col'>
            <div className='bg-logo-image px-2 py-2 w-12 h-12 bg-cover' />
            <h1 className='text-3xl font-bold mr-4 hover:text-orange-500 sm:text-4xl cursor-pointer'> NERD</h1>
          </div>
          <p className='py-4'>Empowering Ethiopian Youth Through Innovation</p>
          <div className='flex justify-between md:w-[75%] my-6'>
            <a target="_blank" href="https://www.facebook.com/Neerrdd/"> <FacebookIcon className='hover:text-orange-600 cursor-pointer' fontSize='large' /></a>
            <a target="_blank" href="https://instagram.com/nerds_center?igshid=MzRlODBiNWFlZA=="> <InstagramIcon className='hover:text-orange-600 cursor-pointer' fontSize='large' /></a>
            <a target="_blank" href="https://et.linkedin.com/company/nerdet"> <LinkedInIcon className='hover:text-orange-600 cursor-pointer' fontSize='large' /></a>
            <a target="_blank" href="https://twitter.com/nerd68792965?lang=en"> <TwitterIcon className='hover:text-orange-600 cursor-pointer' fontSize='large' /></a>
          </div>
        </div>
        <div className='grid  grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
          <div className='flex flex-col '>
            <h6 className='font-medium text-white'>Courses</h6>
            <ul>
              <Link to="/#cors">
                <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>Tech</li>
                <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>Graphic Design</li>
                <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>Python</li>
                <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>JavaScript</li>
              </Link>
            </ul>
          </div>
          <div className='flex flex-col'>
            <h6 className='font-medium text-white'>Support</h6>
            <ul>
              <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>Pricing</li>
              <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>Documentation</li>
              <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>Guides</li>
              <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>API Status</li>
            </ul>
          </div>
          <div className='flex flex-col'>
            <h6 className='font-medium text-white'>Company</h6>
            <ul>
              <Link to="/AboutUs"><li className='py-2 text-sm cursor-pointer hover:text-orange-600'>About</li></Link>
              <li className='cursor-pointer py-2 text-sm hover:text-orange-600'>Blog</li>
              <li className='cursor-pointer py-2 text-sm hover:text-orange-600'>Jobs</li>
              <li className='cursor-pointer py-2 text-sm hover:text-orange-600'>Press</li>
            </ul>
          </div>
          <div className='flex flex-col'>
            <h6 className='font-medium text-white'>Legal</h6>
            <ul>
              <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>Claim</li>
              <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>Policy</li>
              <li className='py-2 text-sm cursor-pointer hover:text-orange-600'>Terms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;