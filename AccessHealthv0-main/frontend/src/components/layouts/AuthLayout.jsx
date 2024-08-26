import React from "react";
import { useLocation, useParams } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <section className="px-5 lg:px-5">
      <div className="w-full max-w-[570px] mx-auto rounded-lg  md:shadow-md  md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          {pathname === "/login" ? (
            <span>
              Hello! <span className="text-primaryColor">Welcome</span> Back 👋
            </span>
          ) : (
            <span>
              Please <span className="text-primaryColor">Insert</span> Your Data
              🖋
            </span>
          )}
        </h3>
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
