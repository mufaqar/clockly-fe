import React from 'react'
import { FaQuestion, FaRegHeart, FaUnlockAlt } from 'react-icons/fa';
import { BsShield } from 'react-icons/bs';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';


const Footer = () => {
  return (
    <footer className='border-t fixed bottom-0 left-0 right-0'>
      <div className='py-6 md:grid md:grid-cols-4 grid-cols-1 gap-7 border-b px-[80px] hidden'>
        <div className='max-w-[290px] mx-auto'>
          <h6 className='text-base font-semibold text-black text-center my-2.5'>
            Drop a Line
          </h6>
          <span className='w-10 h-10 p-2.5 text-xl font-normal text-primary bg-transparent hover:text-white hover:bg-primary border-2 border-primary flex items-center justify-center rounded-full mx-auto'>
            <FaQuestion />
          </span>
          <p className='text-sm font-normal text-black text-center'>
            Questions or feedback? We are all ears and ready to help!
          </p>
          <Link href="#" className='text-base font-medium text-center text-primary flex items-center gap-2 hover:gap-5 mt-3 w-[146px] hover:w-[156px] mx-auto transform transition-all duration-300'>
            Start Convo  <FaArrowRightLong />
          </Link>
        </div>
        <div className='max-w-[290px] mx-auto'>
          <h6 className='text-base font-semibold text-black text-center my-2.5'>
            Support Hub
          </h6>
          <span className='w-10 h-10 p-2.5 text-xl font-normal text-primary bg-transparent hover:text-white hover:bg-primary border-2 border-primary flex items-center justify-center rounded-full mx-auto'>
            <FaRegHeart />
          </span>
          <p className='text-sm font-normal text-black text-center'>
            Navigate your way through solutions, common queries, and FAQs.
          </p>
          <Link href="#" className='text-base font-medium text-center text-primary flex items-center gap-2 hover:gap-5 mt-3 w-[146px] hover:w-[156px] mx-auto transform transition-all duration-300'>
            Support Center  <FaArrowRightLong />
          </Link>
        </div>
        <div className='max-w-[290px] mx-auto'>
          <h6 className='text-base font-semibold text-black text-center my-2.5'>
            Rules of Engagement
          </h6>
          <span className='w-10 h-10 p-2.5 text-xl font-normal text-primary bg-transparent hover:text-white hover:bg-primary border-2 border-primary flex items-center justify-center rounded-full mx-auto'>
            <BsShield />
          </span>
          <p className='text-sm font-normal text-black text-center'>
            Quick insights into our terms. Understand your rights and ours in a snap.
          </p>
          <Link href="#" className='text-base font-medium text-center text-primary flex items-center gap-2 hover:gap-5 mt-3 w-[146px] hover:w-[156px] mx-auto transform transition-all duration-300'>
            Terms of Use  <FaArrowRightLong />
          </Link>
        </div>
        <div className='max-w-[290px] mx-auto'>
          <h6 className='text-base font-semibold text-black text-center my-2.5'>
            Privacy First
          </h6>
          <span className='w-10 h-10 p-2.5 text-xl font-normal text-primary bg-transparent hover:text-white hover:bg-primary border-2 border-primary flex items-center justify-center rounded-full mx-auto'>
            <FaUnlockAlt />
          </span>
          <p className='text-sm font-normal text-black text-center'>
            Dive into how we respect and protect your data. Your privacy matters!
          </p>
          <Link href="#" className='text-base font-medium text-center text-primary flex items-center gap-2 hover:gap-5 mt-3 w-[146px] hover:w-[156px] mx-auto transform transition-all duration-300'>
            Privacy Policy  <FaArrowRightLong />
          </Link>
        </div>
      </div>
      <div className='py-6 flex md:flex-row flex-col items-center justify-between gap-3 bg-black px-[80px]'>
        <p className='text-sm font-normal text-white md:text-start text-center'>
          2024 © Clockly App
        </p>
        <p className='text-sm font-normal text-white md:text-end text-center'>
          Privacy Policy
        </p>
      </div>
    </footer>
  )
}

export default Footer