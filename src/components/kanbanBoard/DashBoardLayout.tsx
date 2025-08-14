"use client";

import { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import HeaderBar from "./HeaderBar";
import KanbanBoard from "./KanbanBoard";

 const DashboardLayout  = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mobile detection and responsive logic
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setIsCollapsed(true);
        setIsSidebarOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
  <div className="relative min-h-screen bg-white flex flex-col">
  {/* Mobile overlay for sidebar */}
  {isMobile && isSidebarOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
      onClick={() => setIsSidebarOpen(false)}
    />
  )}

  {/* HeaderBar */}
  <header className="sticky top-0 z-40 w-full h-16 bg-white border-b border-gray-200">
    <HeaderBar onToggleSidebar={handleToggleSidebar} />
  </header>

  <div className="flex flex-1 overflow-hidden relative">
    {/* Sidebar */}
    <aside
      className={`
        ${isMobile ? "absolute top-16 left-0 h-[calc(100vh-4rem)] z-30" : "sticky top-0 h-[calc(100vh-4rem)]"} 
        ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
        ${isMobile ? "w-64" : isCollapsed ? "w-16" : "w-64"}
        bg-white border-r border-gray-200 
        transition-transform duration-300 ease-in-out
        flex-shrink-0
      `}
    >
      <Sidebar isCollapsed={isCollapsed && !isMobile} />
    </aside>

    {/* Main Content */}
    <main className="flex-1 overflow-hidden">
      <div className="h-full p-4 md:p-6 pt-20 overflow-y-auto overflow-x-hidden">
        <KanbanBoard />
      </div>
    </main>
  </div>
</div>

  );
};

export default DashboardLayout;