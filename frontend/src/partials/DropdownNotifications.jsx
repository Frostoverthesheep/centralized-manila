import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

function DropdownNotifications({
  align
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#2b2a2a] dark:hover:bg-[#3d3d3d] rounded-full ${dropdownOpen && 'bg-slate-200'}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-500 dark:text-zinc-400">
            <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
        </svg>
        <div className="absolute -top-[0.30rem] -right-[0.30rem] w-[1.17rem] h-[1.17rem] bg-rose-500 border-2 border-white dark:border-[#181818] rounded-full flex items-center justify-center text-[0.55rem] text-white font-semibold">
          <span>12</span>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full md:-mr-0 -mr-[6rem] min-w-[19rem] bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#3d3d3d] pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4">Notifications</div>
          <ul>
            <li className="border-b border-slate-200 dark:border-[#3d3d3d] last:border-0">
              <div
                className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-[#242424]"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2"><span className="font-medium text-slate-800 dark:text-slate-100">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                <span className="block text-xs font-normal text-slate-400 dark:text-slate-500">
                    <span>Feb 9, 2021</span>
                    <span >&nbsp; 12:32 PM</span>
                </span>
              </div>
            </li>
            <li className="border-b border-slate-200 dark:border-[#3d3d3d] last:border-0">
              <div
                className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-[#242424]"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2"><span className="font-medium text-slate-800 dark:text-slate-100">Welcome to Centralized Manila!</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                <span className="block text-xs font-normal text-slate-400 dark:text-slate-500">
                    <span>Feb 9, 2021</span>
                    <span >&nbsp; 07:31 AM</span>
                </span>
              </div>
            </li>
            <li className="border-b border-slate-200 dark:border-[#3d3d3d] last:border-0">
              <div
                className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-[#242424]"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2"><span className="font-medium text-slate-800 dark:text-slate-100">Say goodbye to paper receipts!</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                <span className="block text-xs font-normal text-slate-400 dark:text-slate-500">
                    <span>Feb 9, 2021</span>
                    <span >&nbsp; 08:31 AM</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownNotifications;