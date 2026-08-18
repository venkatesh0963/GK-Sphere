import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import SidebarLeft from '../../components/SidebarLeft';
import SidebarRight from '../../components/SidebarRight';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen bg-background-light overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 flex-shrink-0 p-4 hidden md:block">
         <SidebarLeft />
      </div>

      {/* Center Content */}
      <div className="flex-1 p-4 relative overflow-hidden">
        <div className="clay-card w-full h-full p-4 overflow-hidden flex flex-col relative">
          <Outlet />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 flex-shrink-0 p-4 hidden lg:block">
        <SidebarRight />
      </div>
    </div>
  );
};

export default DashboardLayout;
