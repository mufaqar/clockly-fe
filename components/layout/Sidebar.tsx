'use client';

import { useState } from 'react';

import { cn } from '@/lib/style';
import { FiHome } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';
import { FaRegUserCircle, FaRegBuilding } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { IoClose, IoSettingsOutline } from 'react-icons/io5';
import { RiFileList2Line } from 'react-icons/ri';
import { FaBarsStaggered } from 'react-icons/fa6';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    setIsOpen((prev) => !prev);
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <nav
      className={cn(
        `relative block h-screen border-r pt-20 md:block z-10 bg-white`,
        status && 'duration-500',
        isOpen ? 'w-72 bg-white' : 'w-[78px]',
      )}
    >
      <div
        className={cn(
          'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground w-10 h-10 p-2.5 flex items-center justify-center',
          !isOpen && 'rotate-180',
        )}
        onClick={handleToggle}
      >
        {!isOpen ? (
          <FaBarsStaggered className='text-2xl' />
        ) : (
          <IoClose />
        )}

      </div>
      <div className="space-y-4 py-4 h-full md:overflow-y-hidden overflow-y-scroll">
        <div className="px-3 py-2 h-full">
          <div className="mt-3 space-y-1 flex flex-col h-full justify-between">
            <ul className='flex flex-col gap-2.5'>
              {NavLinks?.slice(0, 5).map((item: any, idx: number) => {
                return <li key={idx}>
                  <button className={`text-base font-medium text-title bg-transparent hover:bg-primary hover:text-white flex items-center gap-1 w-full rounded-[15px] py-1.5 group  ${isOpen ? 'justify-start' : "justify-center"}`}>
                    <span className='w-10 h-10 p-2.5 text-xl'>{item?.icon}</span> <span className={`${isOpen ? 'block static' : "md:hidden group-hover:block absolute left-[70px] w-full text-start text-primary"} `}>{item?.title}</span>
                  </button>
                </li>
              })}
            </ul>
            <ul className='flex flex-col gap-2.5'>
              {NavLinks?.slice(5, 7).map((item: any, idx: number) => {
                return <li key={idx}>
                  <button className={`text-base font-medium text-title bg-transparent hover:bg-primary hover:text-white flex items-center gap-1 w-full rounded-[15px] py-1.5 group  ${isOpen ? 'justify-start' : "justify-center"}`}>
                    <span className='w-10 h-10 p-2.5 text-xl'>{item?.icon}</span> <span className={`${isOpen ? 'block static' : "md:hidden group-hover:block absolute left-[70px] w-full text-start text-primary"} `}>{item?.title}</span>
                  </button>
                </li>
              })}
            </ul>
            {/*<SideNav
                            className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
                            items={NavItems}
                        />*/}
          </div>
        </div>
      </div>
    </nav>
  );
}


export const NavLinks = [
  {
    title: "Home",
    link: "#",
    icon: <FiHome />,
  },
  {
    title: 'Profile',
    link: "#",
    icon: <FaRegUserCircle />,
  },
  {
    title: 'My Work',
    link: "#",
    icon: <RiFileList2Line />,
  },
  {
    title: 'Messages',
    link: "#",
    icon: <AiOutlineMessage />,
  },
  {
    title: 'Employers',
    link: "#",
    icon: <FaRegBuilding />,
  },
  {
    title: 'Settings',
    link: "#",
    icon: <IoSettingsOutline />,
  },
  {
    title: 'Log out',
    link: "#",
    icon: <IoMdLogOut />,
  },
]