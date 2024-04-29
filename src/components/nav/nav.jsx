import React, { useEffect, useContext } from "react";
import { LuMoonStar } from "react-icons/lu";
import { LuSunMoon } from "react-icons/lu";
import AppContext from "../../contexts/AppContext";
import { RiSearch2Line } from "react-icons/ri";
import { CiMenuFries } from "react-icons/ci";

export const Nav = () => {
  const { darkMode, toggleTheme, isOpen, toggleSidebar } =
    useContext(AppContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  return (
    <React.Fragment>
      <div className="w-full fixed z-[999] flex items-center justify-center h-[80px] px-[20px] top-[0px] right-0 dark:bg-firstDarkBgColor bg-sidebarLightBgColor">
        <div className="xl:w-[1182px] md:w-[768px] w-[95%] h-[54px] py-[10px] flex items-center justify-between">
          <div className="dark:text-paragraphDarkColor text-titleLightColor text-[20px] font-bold">
            SHAHADA
          </div>
          <ul className="menu-navbar dark:bg-firstDarkBgColor bg-sidebarLightBgColor">
            <p className="dark:text-paragraphDarkColor text-titleLightColor text-[20px] font-bold md:hidden">
              SHAHADA
            </p>
            <li className="dark:text-paragraphDarkColor text-titleLightColor  text-[14px] font-bold cursor-pointer">
              HOME
            </li>
            <li className="dark:text-paragraphDarkColor text-titleLightColor  text-[14px] font-bold cursor-pointer">
              ABOUT US
            </li>
            <li className="dark:text-paragraphDarkColor text-titleLightColor  text-[14px] font-bold cursor-pointer">
              BLOG
            </li>
            <li className="dark:text-paragraphDarkColor text-titleLightColor  text-[14px] font-bold cursor-pointer">
              CONTACT
            </li>
          </ul>
          <div>
            <div className="flex gap-8">
              {darkMode ? (
                <span
                  onClick={toggleTheme}
                  className="dark:text-paragraphDarkColor text-titleLightColor cursor-pointer"
                >
                  <LuSunMoon size={26} />
                </span>
              ) : (
                <span
                  onClick={toggleTheme}
                  className="dark:text-paragraphDarkColor text-titleLightColor cursor-pointer"
                >
                  <LuMoonStar size={26} />
                </span>
              )}
              <span className="dark:text-paragraphDarkColor text-titleLightColor cursor-pointer">
                <RiSearch2Line size={26} />
              </span>
              <span
                className="dark:text-paragraphDarkColor text-titleLightColor cursor-pointer md:hidden"
                onClick={toggleSidebar}
              >
                <CiMenuFries size={26} />
              </span>
            </div>
          </div>
        </div>
        {isOpen ? (
          <div
            className="fixed top-0 left-0 w-full h-screen z-[998] dark:bg-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.1)]"
            onClick={toggleSidebar}
          ></div>
        ) : null}
      </div>
      <style>
        {`
            .menu-navbar{
              display : flex;
              gap : 60px
            }
            @media(max-width : 768px){
              .menu-navbar {
                position : fixed;
                left : ${isOpen ? "0" : "-200%"}; 
                top : 0;
                width : 200px;
                height : 100vh;
                background-color : #fff;
                display : flex; 
                flex-direction: column;
                padding : 15px;
                box-shadow : 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition : 0.4s;
                z-index : 999
              }
            }

          `}
      </style>
    </React.Fragment>
  );
};
