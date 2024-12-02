import React from 'react';
import './Sidebar.css';
import SidebarMenu from './SidebarData';
import { FaHome, FaEnvelope } from 'react-icons/fa';
import { MdDevices } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { id: 1, name: 'Dashboard', icon: <FaEnvelope />, path: '/basic' },
    { id: 2, name: 'Manual', icon: <MdDevices />, pdfPath: '/files/manual.pdf' },
    { id: 3, name: 'Technical', icon: <MdDevices />, pdfPath: '/files/technical.pdf' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FaHome className="sidebar-icon" />
        <span className="sidebar-title">Egroots</span>
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <SidebarMenu
            key={item.id}
            item={item}
            isActive={location.pathname === item.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
