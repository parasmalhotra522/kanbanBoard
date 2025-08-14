"use client";

import { FC } from "react";
import { FaSearch, FaBell, FaAngleDoubleLeft } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { TbColorFilter } from "react-icons/tb";
import { IoChevronDown } from "react-icons/io5";
import Image from "next/image";

interface HeaderBarProps {
  onToggleSidebar: () => void;
}

const HeaderBar: FC<HeaderBarProps> = ({ onToggleSidebar }) => {
  return (
    <header
      className="flex flex-wrap items-center justify-between gap-4 w-full h-auto bg-white border-b px-4 py-2 md:h-16"
      role="banner"
    >
      {/* Left Section: Logo + Sidebar Toggle */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <TbColorFilter
            className="text-violet-700"
            size="1.5rem"
            aria-hidden="true"
          />
          <span className="text-indigo-950 font-bold text-base hidden sm:inline">
            Project M.
          </span>
        </div>
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="text-zinc-500 rounded-md p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <FaAngleDoubleLeft className="w-6 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 min-w-[200px] max-w-xl w-full order-3 md:order-2">
        <div className="relative flex items-center w-full h-10 bg-neutral-100 rounded-md">
          <FaSearch
            size="1rem"
            className="text-zinc-500 absolute left-3"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search for anything..."
            aria-label="Search for anything"
            className="w-full h-full pl-10 pr-3 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Right Section: Icons + Profile */}
      <div className="flex items-center gap-4 flex-shrink-0 order-2 md:order-3">
        <div className="flex items-center gap-4">
          <SlCalender
            className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
            role="button"
            aria-label="Calendar"
          />
          <RxQuestionMarkCircled
            className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
            role="button"
            aria-label="Help"
          />
          <FaBell
            className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
            role="button"
            aria-label="Notifications"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col text-right leading-tight">
            <p className="text-sm font-medium text-indigo-950">
              Anima Agrawal
            </p>
            <p className="text-xs text-zinc-500">U.P, India</p>
          </div>
          <div className="w-[38px] h-[38px] rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
          <Image
            src="/images/profile.jpeg"
            alt="Profile picture of Anima Agrawal"
            width={38}
            height={38}
            className="rounded-full object-cover"
          />
          </div>
          <IoChevronDown
            size="1.125rem"
            className="text-zinc-800 cursor-pointer hover:text-gray-700"
            role="button"
            aria-label="Open profile menu"
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
