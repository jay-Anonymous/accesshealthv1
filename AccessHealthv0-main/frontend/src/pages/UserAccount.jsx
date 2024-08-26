import React, { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UserProfile from "../components/fragments/account-profile/UserProfile";
import UserBooking from "../components/fragments/account-profile/UserBooking";
import useGetProfile from "../hooks/useFetchData";
import { URL } from "../constant/config.js";
import Error from "../components/fragments/Error.jsx";

const UserAccount = () => {
  const { dispatch } = useAuth();
  const [tab, setTab] = useState("bookings");
  const [trigger, setTrigger] = useState(false);

  const {
    data: userData,
    loading,
    errors,
  } = useGetProfile(URL + "/users/profile/me", trigger);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const refetchProfile = useCallback(() => {
    setTrigger((prev) => !prev);
  }, []);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {errors ? (
          <Error errMessage={errors} />
        ) : (
          <div
            className={`${
              loading && "animate-pulse"
            } grid md:grid-cols-3 gap-10`}
          >
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                {loading || errors ? (
                  <div className="w-[100px] h-[100px] overflow-hidden rounded-full boder bg-slate-300 border-solid border-primaryColor"></div>
                ) : (
                  <figure className="w-[100px] h-[100px] overflow-hidden rounded-full boder border-solid border-primaryColor">
                    <img
                      src={userData.photo}
                      alt={userData.name}
                      className="w-full h-full object-contain object-center"
                    />
                  </figure>
                )}
              </div>
              {loading || errors ? (
                <div className="flex justify-center flex-col gap-2 items-center mt-4">
                  <div className="h-[30px] w-full bg-slate-300 rounded"></div>
                  <div className="h-[20px] w-full bg-slate-300 rounded"></div>
                  <div className="h-[20px] w-full bg-slate-300 rounded"></div>
                </div>
              ) : (
                <div className="text-center mt-4">
                  <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                    {userData.name}
                  </h3>
                  <p className="text-textColor text-[15px] leading-6 font-medium">
                    {userData.email}
                  </p>
                  <p className="text-textColor text-[15px] leading-6 font-medium">
                    Blood Type :{" "}
                    <span className="ml-2 text-headingColor text-[22px] leading-8">
                      {userData.bloodType || ""}
                    </span>
                  </p>
                </div>
              )}

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
            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  aria-label="tab bookings"
                  className={`${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-base leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("profiles")}
                  aria-label="tab profiles"
                  className={`${
                    tab === "profiles" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-base leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "profiles" && (
                <UserProfile user={userData} refetchProfile={refetchProfile} />
              )}
              {tab === "bookings" && <UserBooking />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserAccount;
