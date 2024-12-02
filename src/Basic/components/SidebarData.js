import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = ({ item, isActive }) => {
  return (
    <Link to={item.path} className="menu-link">
      <div className={`menu-item ${isActive ? 'menu-item-active' : ''}`}>
        <span className="menu-icon">{item.icon}</span>
        <span className="menu-name">{item.name}</span>
      </div>
    </Link>
  );
};

export default SidebarMenu;
