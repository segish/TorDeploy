import React from 'react'
import sImg from '../components/images/NERDLogo1.png'

const AboutUs = () => {
  return (

    <div className='p-10 mx-4  mb-10 dark:text-zinc-400 dark:bg-slate-950'>
     <div className='w-full flex '> <h1 className=' text-4xl md:text-[50px] text-center p-8'>Welcome to <span className='text-orange-600  '>NERD</span>: Empowering Ethiopian Youth Through Innovation</h1></div>

      <p className='text-xl'>At NERD (New Era Research and Development), we believe in the power of innovation to make a positive impact in Ethiopian communities. As a private research and education center located in Addis Ababa, Ethiopia, we are dedicated to fostering a new era of technological advancement and skill development among Ethiopian youth.</p>
      <div>
        <div className='lg:mx-20 '>
          <div className='lg:mx-20 lg:flex w-full h-[100px] lg:h-[200px] xl:pl-[170px] md:justify-start'><h2 className='sm:text-[40px]  md:text-[100px] lg:mt-14 lg:text-[150px]'>Our Focus</h2></div>
          <div className='lg:mx-20 mt-4 md:mt-8 grid grid-cols-1 lg:grid-cols-2'><div className='md:h-[100px] lg:h-[300px] flex-col relative'><h2 className='sm:text-[40px] md:text-[100px]   lg:h-[200px] absolute bottom-0 lg:top-0 lg:right-0 lg:text-[150px]'>Areas</h2></div>
            <div className=''>
              <p className='mr-4 lg:pt-8'><span className='font-bold text-orange-600'>Small-Scale Manufacturing and CNC Services:</span> We specialize in small-scale manufacturing, offering training, prototyping, and CNC services in various fields such as aeronautics, mechatronics, and precision agriculture. Our expertise lies in reverse engineering, value addition, and product development of computer numerically controlled (CNC) machines and remotely controlled semi-autonomous machines. Whether you need custom CNC machining, prototyping, or product development, our team of skilled technicians and engineers can provide tailored solutions to meet your specific requirements.
                <br></br>
                <br></br>
                <span className='font-bold text-orange-600'>Private Research and Development:</span> We are committed to conducting cutting-edge research and development projects that address local challenges and contribute to Ethiopia's industrialization efforts. Our team of experts collaborates with industry partners and academic institutions to drive innovation and create sustainable solutions.
                <br></br>
                <br></br>
                <span className='font-bold text-orange-600'>Advanced Courses and Workshops:</span> We offer advanced courses and workshops in emerging technologies, including robotics, drones, and rapid prototyping. Our goal is to equip Ethiopian youth with the necessary technical skills to thrive in the digital era and seize opportunities in the global job market.
                <br></br>
                <br></br>
                <span className='font-bold text-orange-600'>Computer Software Development:</span> Our dedicated team of software developers focuses on creating innovative solutions tailored to the Ethiopian context. From learning management systems to biomedical tools, we harness the power of technology to drive societal progress and improve lives.</p></div>
          </div>
        </div>
      </div>

      <div>
        <div className='lg:mx-20 '>
          <div className='lg:mx-20 lg:flex w-full h-[100px] lg:h-[300px] xl:pl-[100px] md:justify-start'><h2 className='sm:text-[40px]  md:text-[100px] lg:mt-32  xl:text-[150px]'>Why Choose </h2></div>
          <div className='lg:mx-20 mt-4 md:mt-14 grid grid-cols-1 lg:grid-cols-2'><div className=' md:h-[100px] lg:h-[300px] flex-col relative'><h2 className='sm:text-[40px] md:text-[100px]   xl:h-[200px] absolute bottom-0 lg:top-0 lg:right-0 xl:text-[150px]'>NERD?</h2></div>
            <div className=''>
              <p className='mr-4 lg:pt-8'><span className='font-bold text-orange-600'>Expertise and Experience:</span> Our team brings together a diverse range of expertise, with members who have worked at renowned organizations such as the United Nations and the African Union. With backgrounds in economics, aeronautical engineering, journalism, and more, we offer a wealth of knowledge and experience.
                <br></br>
                <br></br>

                <span className='font-bold text-orange-600'>Quality Prototypes and CNC Manufacturing:</span> Our in-house prototypes, including 3D printers, foam cutting CNC machines, and desktop CNC machines, are designed and built with precision. We also offer professional CNC manufacturing services, delivering high-quality, custom machined parts and components for various industries. Our CNC machines are equipped with advanced technology and operated by skilled technicians, ensuring accuracy, efficiency, and reliability.
                <br></br>
                <br></br>

                <span className='font-bold text-orange-600'>Job Creation and Skill Development:</span> By expanding our operations and providing training opportunities, we aim to create job opportunities for skilled workers in various industries. We believe in empowering Ethiopian youth with the technical skills needed for a prosperous future.
                <br></br>
                <br></br>
                <span className='font-bold text-orange-600'>Collaboration and Partnerships:</span> We actively seek partnerships with local and international organizations, academic institutions, and industry leaders. Through collaboration, we can leverage collective expertise and resources to drive meaningful change and advance Ethiopia's technological landscape.</p></div>
          </div>
        </div>
      </div>

      <div>
        <div className='mb-20'>
          <div className=' lg:flex w-full h-[100px] mt-4 lg:h-[300px] xl:pl-[170px] md:justify-start'><h2 className='sm:text-[35px]  md:text-[100px] lg:mt-32 xl:text-[150px]'>Join The NERD</h2></div>
          <div className='2xl:ml-[150px]   md:mt-0  grid grid-cols-1 lg:grid-cols-2'><div className='md:h-[100px] lg:h-[300px] flex-col relative'><h2 className='sm:text-[35px] md:text-[100px]   lg:h-[200px] absolute bottom-0 lg:left-0 lg:top-0 lg:text-[90px]  xl:text-[110px]'>Community</h2></div>
            <div className='mt-4  md:mt-0'>
              <p className='mr-4 pr-4 lg:pt-8'>Are you passionate about innovation and making a difference? Join the NERD community and be a part of Ethiopia's journey towards a brighter future. Whether you're a student, professional, or organization, we welcome you to explore our programs, engage in research projects, or collaborate on initiatives that align with our mission.
                <br></br>
                <br></br>
                Contact us today to learn more about our CNC services, manufacturing capabilities, offerings, partnership opportunities, or how you can contribute to our mission of empowering Ethiopian youth through innovation. Together, let's shape a new era of technological advancement in Ethiopia.</p></div>
          </div>
        </div>
      </div>
  
                    <h1 className='flex justify-center text-4xl md:text-[100px] pb-4'>Our Founders</h1>

      <div className='flex justify-center'> <img className='w-[100px] h-[100px] object-cover rounded-full mt-14' src={sImg} alt="" /> </div>
      <h2 className='text-3xl my-4 flex justify-center gap-2'><span className='text-orange-600'>CEO:</span> Minas Gettu</h2>

      <p className='lg:w-[600px] flex  text-center mx-auto'>Minas is a co-founder of NERD with a B.A. in Political Science from Temple University, USA, and a Master's degree in Economics from the University of International Business and Economics (UIBE), China.
        He has diverse experience in international development, business, and education sectors, having worked at organizations such as the United Nations Population Fund, International Organization for Migration, and Essex County Education Commission.</p>
      <div className='flex justify-center'> <img className='w-[100px] h-[100px] object-cover rounded-full mt-14' src={sImg} alt="" /> </div>
      <h2 className='text-3xl my-4 flex justify-center gap-2'><span className='text-orange-600'>CTO:</span> Natnael Kebede</h2>

      <p className='lg:w-[600px] flex  text-center mx-auto'>CTO Natnael Kebede has studied Aeronautical Engineering in Defence university. He has extensive experiance in Embeded software development, mechatronic system design and deployment, and opration managment of hardware prototype labs. He had work expiriance as a lecturer for defence university, and also multiple tech based buisness incubtations locally. He is an ambassador for an internationally reputable CPU manufacturere NVIDIA. In addition is a board member for Aeronautical Professional society.</p>
    </div>
  )
}

export default AboutUs
