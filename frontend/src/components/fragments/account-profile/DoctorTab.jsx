/* eslint-disable react/prop-types */
import { BiMenu } from "react-icons/bi";
import { useAuth } from "../../../context/AuthContext";

const TabProfileDoctor = ({ tab, setTab }) => {
  const { dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      {/* <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span> */}
      <div className=" lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } btn w-full mt-0 rounded-md`}
          onClick={() => setTab("overview")}
          aria-label="tab overview"
        >
          Overview
        </button>
        <button
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } btn w-full mt-0 rounded-md`}
          onClick={() => setTab("appointments")}
          aria-label="tab appointments"
        >
          Appointments
        </button>
        <button
          className={`${
            tab === "settings"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } btn w-full mt-0 rounded-md`}
          aria-label="tab settings"
          onClick={() => setTab("settings")}
        >
          Profile
        </button>
        <div className="mt-[50px] md:mt-[80px]">
          <button
            className="w-full bg-primaryColor p-3 text-white text-base leading-7 rounded-md"
            aria-label="button logout"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button className="w-full bg-red-600 mt-4 p-3 text-white text-base leading-7 rounded-md">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabProfileDoctor;
