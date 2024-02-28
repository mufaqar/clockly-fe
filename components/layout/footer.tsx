import React from 'react'
import { FaQuestion, FaRegHeart, FaUnlockAlt } from 'react-icons/fa';
import { BsShield } from 'react-icons/bs';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';


const Footer = () => {
  return (
    <footer className='border-t  w-full  bg-red-700 px-8 '>      
      <div className='py-6 flex md:flex-row  flex-col items-center justify-between '>
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