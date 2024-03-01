import React, { useState } from 'react';
import { useColor } from '@/const/colorcontext';
import { solidColors } from '@/const/colors';
import { FaCheck } from 'react-icons/fa';

const ColorSelect = () => {
    const { setSelectedColor } = useColor();
    const [selectedColor, setSelectedColorState] = useState(null);

    const handleColorSelection = (colorCode: any) => {
        setSelectedColor(colorCode);
        setSelectedColorState(colorCode); // Update selected color state
    };

    return (
        <div>
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900 mb-3">
                    Choose Color
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 md:gap-3 lg:gap-6">
                    {solidColors.map(({ id, colorCode }) => (
                        <div onClick={() => handleColorSelection(colorCode)} key={id} className="image-container cursor-pointer relative">
                            <div
                                className={`px-10 py-10 solid rounded-xl ${selectedColor === colorCode && '_active-bg'}`}
                                style={{ backgroundColor: colorCode }}>
                                {selectedColor === colorCode && <div className='absolute bg-[#3F9BFC] p-[2px] right-4 top-4 rounded-full text-white flex justify-center items-center flex-col'>
                                    <FaCheck />
                                </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorSelect;
