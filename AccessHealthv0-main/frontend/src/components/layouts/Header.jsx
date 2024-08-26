import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
const navLinks = [
  {
    path: "/home",
    name: "Home",
  },
  {
    path: "/doctors",
    name: "Find a Doctor",
  },
  {
    path: "/services",
    name: "Services",
  },
  {
    path: "/contact",
    name: "Contact",
  },
];

const Header = () => {
  const [isNav, setIsNav] = useState(false);
  const headerRef = useRef(null);
  const { state } = useAuth();

  const handleToggleNav = () => {
    setIsNav(!isNav);
  };

  const stickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 0.01 ||
        document.documentElement.scrollTop > 0.01
      ) {
        headerRef.current.classList.add("sticky-header");
      } else {
        headerRef.current.classList.remove("sticky-header");
      }
    });
  };

  useEffect(() => {
    if (isNav) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }

    return () =>
      document.querySelector("body").classList.remove("overflow-hidden");
  }, [isNav]);

  useEffect(() => {
    stickyHeader();

    return () => window.removeEventListener("scroll", stickyHeader);
  });

  return (
    <header className="header flex items-center py-2" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <figure>
            <img src={logo} alt="Medicare" />
          </figure>

          <div
            className={`${isNav && "show"} navigation`}
            onClick={(e) => {
              e.target === e.currentTarget && handleToggleNav();
            }}
            role={isNav ? "dialog" : ""}
          >
            <ul className="primary-list  flex items-center gap-[2.7rem]">
              <li className="md:hidden position absolute top-2 right-2 ">
                <button
                  onClick={handleToggleNav}
                  className="py-1.5 px-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  <IoMdClose />
                </button>
              </li>
              {navLinks.map((link, i) => (
                <li key={i + 1}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-semibold"
                        : "text-textColor text-base leading-7 font-medium"
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {state.token && state.user ? (
              <>
                <div className="">
                  <Link
                    to={`${
                      state.role === "doctor"
                        ? "/doctors/profile/me"
                        : "/users/profile/me"
                    } `}
                  >
                    <figure className="w-[35px] h-[35px] rounded-full">
                      <img
                        src={state.user?.photo}
                        alt="user image"
                        className="w-full h-full object-cover object-top rounded-full"
                      />
                    </figure>
                  </Link>
                </div>
              </>
            ) : (
              <Link to={"/login"}>
                <button className="bg-primaryColor py-2 px-6 text-white font-semibold h-[36px]  flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <button className="md:hidden" onClick={handleToggleNav}>
              <HiMiniBars3 className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
