import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMessage } from "react-icons/ai";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="sm:relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] bg-gray-50 hover:text-primary"
        href="#"
      >
        <span
          className={`absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-red-600 ${notifying === false ? "" : "inline"
            }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75"></span>
        </span>
        <AiOutlineMessage className="fill-current duration-300 ease-in-out w-9 h-9 p-2 flex items-center justify-center text-xl" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-4 mt-2.5 flex h-90 w-64 flex-col rounded-sm border bg-white shadow-default sm:right-0 sm:w-80 ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
        </div>

        <ul className="flex h-72 flex-col overflow-y-scroll">
          <li>
            <Link
              className="flex gap-4 items-center border-t px-4 py-3 hover:bg-gray-50"
              href="/messages"
            >
              <div className="h-12 w-12 rounded-full">
                <Image
                  width={112}
                  height={112}
                   src={"/images/profile-pic.png"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 items-center border-t px-4 py-3 hover:bg-gray-50"
              href="/messages"
            >
              <div className="h-12 w-12 rounded-full">
                <Image
                  width={112}
                  height={112}
                   src={"/images/profile-pic.png"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black">
                  Robert Jhon
                </h6>
                <p className="text-sm">Can you share your offer?</p>
                <p className="text-xs">10min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 items-center border-t px-4 py-3 hover:bg-gray-50"
              href="/messages"
            >
              <div className="h-12 w-12 rounded-full">
                <Image
                  width={112}
                  height={112}
                   src={"/images/profile-pic.png"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black">
                  Henry Dholi
                </h6>
                <p className="text-sm">I cam across your profile and...</p>
                <p className="text-xs">1day ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 items-center border-t px-4 py-3 hover:bg-gray-50"
              href="/messages"
            >
              <div className="h-12 w-12 rounded-full">
                <Image
                  width={112}
                  height={112}
                   src={"/images/profile-pic.png"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black">
                  Cody Fisher
                </h6>
                <p className="text-sm">I’m waiting for you response!</p>
                <p className="text-xs">5days ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 items-center border-t px-4 py-3 hover:bg-gray-50"
              href="/messages"
            >
              <div className="h-12 w-12 rounded-full">
                <Image
                  width={112}
                  height={112}
                   src={"/images/profile-pic.png"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownMessage;
