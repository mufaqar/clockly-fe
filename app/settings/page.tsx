"use client"
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { solidColors } from '@/const/colors'

export default function Settings() {
    const [activeImage, setActiveImage] = React.useState();

    return (
        <div className='sm:p-8'>
            <div className='bg-white shadow-md p-8 rounded-lg'>
                <div className="flex justify-between item-center w-full ">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 mb-3">
                        Settings
                    </h2>
                </div>
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900 mb-3">
                        Choose Color
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 md:gap-3 lg:gap-6">
                        {solidColors.map(({ color, i }: any) => {
                            return (
                                <div key={i}
                                    className="image-container cursor-pointer relative">
                                    <div className={`px-10 py-10 solid rounded-xl ${activeImage === color?.colorCode && '_active-bg'}`} style={{ background: color?.colorCode }}>
                                        <div className='absolute bg-[#3F9BFC] p-[2px] right-4 top-4 rounded-full text-white flex justify-center items-center flex-col'>
                                            <FaCheck />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
