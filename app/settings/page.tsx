"use client"
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { solidColors } from '@/const/colors'
import ColorSelect from '@/components/choose-color';

export default function Settings() {
    const [activeImage, setActiveImage] = React.useState();

    return (
        <div className='sm:p-8'>
            <div className='bg-white shadow-md p-8 rounded-lg'>
                <div className="flex justify-between item-center w-full ">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 mb-4">
                        Settings
                    </h2>
                </div>
               <ColorSelect />
            </div>
        </div>
    )
}
