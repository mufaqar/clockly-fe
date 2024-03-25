'use client';

import { useState } from 'react';

import { cn } from '@/lib/style';
import { FaEnvelopeOpen, FaUserAlt } from 'react-icons/fa';
import Link from 'next/link';

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
        ` block md:h-screen h-fit md:border-r border-t md:pt-20 md:block z-40 bg-background md:static fixed bottom-0`,
        status && 'duration-500',
        isOpen ? 'w-72 bg-background' : 'md:w-[78px] w-full',
      )}
    >
        <div className="pt-2 md:pb-10">
            <ul className='md:mt-8 flex md:flex-col flex-row gap-2.5 md:justify-start justify-between'>
              {NavLinks?.slice(0, 5).map((item: any, idx: number) => {
                return <li key={idx}>
                  <Link href={item?.link} className={`text-xs font-medium text-foreground/55 bg-transparent border-l-[3px] border-transparent hover:border-primary hover:bg-white hover:text-primary flex flex-col items-center gap-1 py-3 px-2 group  ${isOpen ? 'justify-start' : "justify-center"}`}>
                    <span className='text-lg'>{item?.icon}</span> <span className='hidden'>{item?.title}</span>
                  </Link>
                </li>
              })}
            </ul>
        </div>
    </nav>
  );
}


export const NavLinks = [
  {
    title: 'Profile',
    link: "/",
    icon: <FaUserAlt />,
  },
  {
    title: 'Messages',
    link: "#",
    icon: <FaEnvelopeOpen />,
  },
]