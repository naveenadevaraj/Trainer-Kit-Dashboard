import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = ({ item, isActive }) => {
  const isExternal = !!item.pdfPath;

  const commonClasses = `menu-link ${isActive ? 'menu-item-active' : ''}`;

  return isExternal ? (
    <a
      href={item.pdfPath}
      target="_blank"
      rel="noopener noreferrer"
      className={commonClasses}
    >
      <div className="menu-item">
        <span className="menu-icon">{item.icon}</span>
        <span className="menu-name">{item.name}</span>
      </div>
    </a>
  ) : (
    <Link to={item.path} className={commonClasses}>
      <div className="menu-item">
        <span className="menu-icon">{item.icon}</span>
        <span className="menu-name">{item.name}</span>
      </div>
    </Link>
  );
};

export default SidebarMenu;
