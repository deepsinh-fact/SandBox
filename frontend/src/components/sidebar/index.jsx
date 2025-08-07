/* eslint-disable */
import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "../../routes";
import Infodata from "../../data/Infodata";
import { Link } from "react-router-dom";
import React from "react";

const Sidebar = ({ open, onClose }) => {
  const [name, setName] = React.useState(false);
  React.useEffect(() => {
    if (window.innerWidth < 1200) {
      setName(true);
    } else {
      setName(false);
    }
  }, [window.innerWidth]);
  return (
    <div
      className={`sm:none duration-175 linear absolute bottom-0 top-0 z-50 flex h-screen  min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all 
      dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:static xl:!z-0 xl:h-auto ${open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>
      <div className="absolute right-0 top-1 hidden cursor-pointer xl:block">
        <label className="hamburger">
          <input
            type="checkbox"
            onChange={() => setName(!name)}
            onClick={() => setName(!name)}
            checked={name}
          />
          <svg viewBox="0 0 32 32">
            <path
              className="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </div>
      <Link to={"/admin/default"}>
        <div className={`ml-[10px] mr-[0px] mt-[30px] flex items-center`}>
          <div
            className={`ml-1 mt-0 h-[30px] ${name ? "w-[200px]" : "w-[70px]"
              }  font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white`}
          >
            <img
              className="hidden w-[110px] dark:inline-block"
              src={Infodata.Factbytew}
              alt="logo"
            />
            <img
              className="inline-block w-[110px] dark:hidden"
              src={Infodata.Factbyteb}
              alt="logo"
            />
          </div>
        </div>
      </Link>
      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}
      <ul className="mb-auto pt-1">
        <Links onClose={onClose} routes={routes} name={name} />
      </ul>
      {/* Free Horizon Card */}
      {/* <div className="flex justify-center"><SidebarCard /></div> */}

      {/* Nav item end */}
    </div>
  );
};
export default Sidebar;
