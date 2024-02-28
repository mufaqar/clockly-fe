import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

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
        href="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] bg-gray-50 hover:text-primary"
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-red-600 ${notifying === false ? " " : "inline"
            }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75"></span>
        </span>
        <IoMdNotificationsOutline className="fill-current duration-300 ease-in-out w-9 h-9 p-2 flex items-center justify-center text-xl" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-4 mt-2.5 flex h-90 w-64 flex-col rounded-sm border bg-white shadow-default sm:right-0 sm:w-80 ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
        </div>

        <ul className="flex h-72 flex-col overflow-y-scroll">
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t px-4 py-3 hover:bg-gray-50 "
              href="#"
            >
              <p className="text-sm">
                <span className="text-black">
                  Edit your information in a swipe
                </span>{" "}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t px-4 py-3 hover:bg-gray-50"
              href="#"
            >
              <p className="text-sm">
                <span className="text-black ">
                  It is a long established fact
                </span>{" "}
                that a reader will be distracted by the readable.
              </p>

              <p className="text-xs">24 Feb, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t px-4 py-3 hover:bg-gray-50"
              href="#"
            >
              <p className="text-sm">
                <span className="text-black">
                  There are many variations
                </span>{" "}
                of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className="text-xs">04 Jan, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t px-4 py-3 hover:bg-gray-50"
              href="#"
            >
              <p className="text-sm">
                <span className="text-black">
                  There are many variations
                </span>{" "}
                of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className="text-xs">01 Dec, 2024</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownNotification;
