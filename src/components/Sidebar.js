import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../assets/DBZlogo.png';

const categories = [
  { name: 'Z Fighters' },
  { name: 'Wallpapers' },
  { name: 'DBZ Items' },
  { name: 'Special Attacks' },
  { name: 'DBZ Cuisine' },
];

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const isNotActiveStyle =
    'flex items-center px-5 gap-3 text-gray-200 hover:text-black transition-all duration-200 ease-in-out capitalize';

  const isActiveStyle =
    'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

  return (
    <div className="flex flex-col justfiy-between bg-blue-500 h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center">
          <img
            src={logo}
            alt="logo"
            className="w-full"
            onClick={handleCloseSidebar}
          />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={(isActive) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl text-white">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-3 items-center bg_gradient cursor-pointer shadow-lg rounded-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p className="text-white"> {user.userName} </p>
          <IoIosArrowForward color="white" />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
