import { useState } from "react";
import { FC } from "react";
import { FaCog } from "react-icons/fa";
import { PiSquaresFour } from "react-icons/pi";
import { HiLightBulb } from "react-icons/hi";
import { LuUsersRound } from "react-icons/lu";
import { LuMessageSquareMore } from "react-icons/lu";
import { BsCardChecklist } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
interface SidebarProps {
  isCollapsed: boolean;

}


const Sidebar: FC<SidebarProps> = ({ isCollapsed }) => {

    const [activeProject, setActiveProject] = useState("Mobile App");

  const sideNavBarItems =  [
    { icon:<PiSquaresFour size="1.5rem" aria-label="hidden"/>, label: "Home" },
    { icon:<LuMessageSquareMore size="1.5rem" aria-label="hidden"/>, label: "Messages"},
    { icon:<BsCardChecklist size="1.5rem" aria-label="hidden"/>, label: "Tasks"},
    { icon:<LuUsersRound size="1.5rem" aria-label="hidden"/>,  label: "Members"},
    { icon:<FaCog size="1.5rem" aria-label="hidden"/>,  label: "Settings"}
  ];
  const projects =  [
    { name: "Mobile App", color: "bg-green-500", activeBg: "#F5F6FB" },
    { name: "Website Redesign", color: "bg-amber-500" },
    { name: "Design System", color: "bg-purple-200" },
    { name: "Wireframes", color: "bg-blue-400" },
  ];
  return (
 
<aside 
className={`bg-white border-r border-gray-200 transition-all duration-300
    ${isCollapsed ? "w-16" : "w-64"} flex flex-col
    ${/* Mobile: fixed overlay */""}
    md:static md:h-full
  `}
  aria-label="Sidebar"
  role="navigation"
  >
  {/* Main content - NO SCROLL */}
  <div className={`flex-1 flex flex-col ${isCollapsed ? "px-1" : "px-6"} mt-3`}>
    
    {/* Nav items */}
    <ul className="inline-grid gap-[.25rem] ">
      {sideNavBarItems.map((item, index) => (
        <SidebarNavItem
          key={index}
          icon={item.icon}
          label={item.label}
          isCollapsed={isCollapsed}
        />              
      ))}
    </ul>
      <hr className="mt-6 border-t border-[1px] border-neutral-300" />
    
    {/* MY PROJECTS Section */}
    {!isCollapsed && (
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semi-bold text-zinc-500 tracking-wide uppercase">
            MY PROJECTS
          </h3>
          
        <button
            type="button"
            aria-label="Add new project"
            className="text-zinc-400 hover:text-purple-600 transition-colors p-1 rounded-md focus:outline-none"
          >
            <CiSquarePlus size="1rem" aria-label="hidden" />
          </button>
        </div>
        
        <ul className="space-y-1">
          {projects.map((project) => {
            const isActive = activeProject === project.name;
            return (
            <li
                key={project.name}
                className={`flex items-center justify-between rounded-md px-3 py-2 ${
                  isActive
                    ? "bg-[#F5F6FB] font-semibold text-indigo-950"
                    : "text-zinc-500"
                } cursor-pointer`}
                onClick={() => setActiveProject(project.name)}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 ${project.color} rounded-full`}></span>
                  {project.name}
                </div>
                {isActive && (
                  <IoIosMore className="text-zinc-400 w-4 h-4 flex-shrink-0" />
                )}
              </li>
            );
          })}
        </ul>
      </section>
    )}

    {/* Spacer to push Thoughts Time to bottom */}
    <div className="flex-1"></div>
  </div>

  {/* Thoughts Time section - Fixed at bottom */}
  {!isCollapsed && (
    <section className="px-6 pb-6 flex-shrink-0">
      <div className="relative flex flex-col items-center bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden p-4">
        
        {/* Lamp Icon */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center -mt-6 z-10 relative mb-2">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-100"
            style={{
              boxShadow: '0 4px 12px rgba(251, 191, 36, 0.25)'
            }}
          >
            <HiLightBulb className="text-yellow-500 text-lg" />
          </div>
        </div>
        
        {/* Card content */}
        <div className="text-center w-full">
          <h3 className="text-zinc-500 font-medium text-sm mb-2">
            Thoughts Time
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-3 px-1">
            We don't have any notice for you, till then you can share your thoughts with your peers.
          </p>
          <input placeholder="Enter a message" className="bg-white"/>
          {/* className="bg-gray-800 hover:bg-gray-900 transition-colors text-white font-medium text-xs rounded-lg px-4 py-2.5 w-full" */}
            
        </div>
      </div>
    </section>
  )}
</aside>
 
  );
};

// Extracted NavItem for readability and hover styling
import React from "react";

const SidebarNavItem = ({
  icon,
  label,
  isCollapsed,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
}) => (
  <li role="listitem">
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 text-zinc-500 hover:text-purple-600 cursor-pointer px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <span
        className="flex-shrink-0 inline-flex items-center justify-center"
      >
        {icon}
      </span>
      {!isCollapsed && (
        <span className="text-[1rem] leading-none">{label}</span> // 16px text, scalable
      )}
    </button>
  </li>
);




export default Sidebar;



