import React from "react";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";


const quiclink01 = [
  {
    path: "/home",
    name: "Home",
  },
  {
    path: "/",
    name: "About Us",
  },
  {
    path: "/services",
    name: "Services",
  },
  {
    path: "/",
    name: "Blog",
  },
];
const quiclink02 = [
  {
    path: "/find-a-doctor",
    name: "Find a Doctor",
  },
  {
    path: "/",
    name: "Request an Apoppintment",
  },
  {
    path: "/",
    name: "Find a Location",
  },
  {
    path: "/",
    name: "Get a Oponion",
  },
];

const quiclink03 = [
  {
    path: "/",
    name: "Donate",
  },
  {
    path: "/Contact",
    name: "Contact Us",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between  flex-col md:flex-row flex-wrap gap-8">
          <div>
            <figure>
              <img src={logo} alt="logo" />
            </figure>
            <p className="text-para">
              {" "}
              Copyright &copy; {year} created by Anwar Hakim, All right
              Reserved.{" "}
            </p>
            <div className="flex items-center gap-4 mt-4">
              {socialLink.map((sosmed, index) => (
                <Link
                  key={index}
                  to={sosmed.link}
                  className="w-9 h-9 rounded-full border border-solid border-slate-800 flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  target="__blank"
                >
                  {sosmed.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="text-[20px] leading-[30px] font-bold mb-6 text-headingColor">
              Quick Links
            </h2>
            <ul>
              <div>
                {quiclink01.map((item, index) => (
                  <li key={index} className="mb-4">
                    <Link
                      to={item.path}
                      className="text-base leading-7 text-textColor"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </div>
          <div className="">
            <h2 className="text-[20px] leading-[30px] font-bold mb-6 text-headingColor">
              I Want To:
            </h2>
            <ul>
              <div>
                {quiclink02.map((item, index) => (
                  <li key={index} className="mb-4">
                    <Link
                      to={item.path}
                      className="text-base leading-7 text-textColor"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </div>
          <div className="">
            <h2 className="text-[20px] leading-[30px] font-bold mb-6 text-headingColor">
              Support
            </h2>
            <ul>
              <div>
                {quiclink03.map((item, index) => (
                  <li key={index} className="mb-4">
                    <Link
                      to={item.path}
                      className="text-base leading-7 text-textColor"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
