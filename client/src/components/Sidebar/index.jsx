import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { sidebar, } from '~/constants';
import { Link, useLocation, } from 'react-router-dom';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleDown,
  faAngleUp,
  faBars, } from '@fortawesome/free-solid-svg-icons';
import { useSelector, } from 'react-redux';

const Sidebar = ({ className, }) => {
  const [openMenus, setOpenMenus,] = useState({
  });
  const [isSidebarOpen, setIsSidebarOpen,] = useState(true);
  const [hoveredItem, setHoveredItem,] = useState(null);
  const location = useLocation();

  const { shop, } = useSelector((state) => state.config);

  const handleMenuClick = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => location.pathname === path;
  const hasActiveChild = (children) =>
    children.some((child) => isActive(child.path));

  return (
    <div
      className={`h-screen text-left px-0 relative top-0 left-0 shadow-md transition-all duration-300 ${className} ${isSidebarOpen ? 'w-80' : 'w-0'}`}
    >
      <div
        className={`absolute top-6 z-30 hover:cursor-pointer ${isSidebarOpen ? '-right-10' : '-right-10'}`}
        onClick={toggleSidebar}
        style={{
          color: shop?.accentColor,
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div
        className={`${isSidebarOpen ? 'block' : 'hidden'} py-4 h-full overflow-y-auto`}
        style={{
          backgroundColor: shop?.primaryBackground,
        }}
      >
        <ul className='p-0 text-sm font-medium font-["Inter"] leading-normal'>
          {sidebar.map((item) => (
            <li
              key={item.key}
              className='mb-2'
              onMouseEnter={() => setHoveredItem(item.key)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.children ? (
                <>
                  <div
                    className={`flex items-center justify-between cursor-pointer py-2 ${hasActiveChild(item.children) ? 'border-r-4' : ''}`}
                    style={{
                      borderColor: isActive(item.path)
                        ? shop?.accentColor
                        : 'transparent',
                      color: shop?.primaryColor,
                    }}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <span className='px-4'>{item.label}</span>
                    <span className='px-4'>
                      {openMenus[item.key] ? (
                        <FontAwesomeIcon icon={faAngleUp} />
                      ) : (
                        <FontAwesomeIcon icon={faAngleDown} />
                      )}
                    </span>
                  </div>
                  {openMenus[item.key] && (
                    <ul className='p-0 mt-2'>
                      {item.children.map((child) => (
                        <li
                          key={child.key}
                          className='mb-1'
                          onMouseEnter={() => setHoveredItem(child.key)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <Link
                            to={child.path}
                            className={`block py-2 px-5 text-sm font-medium font-["Inter"] leading-normal no-underline ${isActive(child.path) ? 'border-r-4' : ''}`}
                            style={{
                              borderColor: isActive(child.path)
                                ? shop?.accentColor
                                : 'transparent',
                              color: isActive(child.path)
                                ? shop?.accentColor
                                : hoveredItem === child.key
                                  ? shop?.neutralColor
                                  : shop?.primaryColor,
                            }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`block py-2 px-4 text-sm font-medium font-["Inter"] leading-normal no-underline ${isActive(item.path) ? 'border-r-4' : ''}`}
                  style={{
                    borderColor: isActive(item.path)
                      ? shop?.accentColor
                      : 'transparent',
                    color: isActive(item.path)
                      ? shop?.accentColor
                      : hoveredItem === item.key
                        ? shop?.neutralColor
                        : shop?.primaryColor,
                  }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
