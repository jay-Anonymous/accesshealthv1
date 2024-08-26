import React, { useCallback, useState } from "react";
import useGetProfile from "../hooks/useFetchData";
import { URL } from "../constant/config.js";
import Error from "../components/fragments/Error.jsx";
import DoctorTab from "../components/fragments/account-profile/DoctorTab.jsx";
import { RiInformation2Fill } from "react-icons/ri";
import starIcon from "../assets/images/Star.png";
import DoctorAbout from "../components/fragments/doctor-details/DoctorAbout.jsx";
import DoctorProfile from "../components/fragments/account-profile/DoctorProfile.jsx";
import DoctorAppointment from "../components/fragments/account-profile/DoctorAppointment.jsx";

const DoctorAccount = () => {
  const [tab, setTab] = useState("overview");
  const [trigger, setTrigger] = useState(false);

  const {
    data: doctorData,
    loading,
    errors,
  } = useGetProfile(`${URL}/doctors/profile/me`, trigger);

  const refetchProfile = useCallback(() => {
    setTrigger((prev) => !prev);
  }, []);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {errors ? (
          <Error errMessage={errors} />
        ) : (
          <div className="grid md:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <DoctorTab tab={tab} setTab={setTab} />
            <div className="scroll overflow-auto md:col-span-2">
              {doctorData.data?.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <RiInformation2Fill className="flex-shrink w-5 h-5" />
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complate your. we&apos;ll review
                    manually and approve within 3days.
                  </div>
                </div>
              )}
              <div className="mt-8 min-h-[150px] w-full overflow-auto scroll">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="w-[200px] h-[200px] overflow-hidden">
                        <img
                          src={doctorData.data?.photo}
                          alt={doctorData.data?.name}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </figure>
                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-base lg:leading-6 font-semibold">
                          {doctorData.data?.specialization || "specialization"}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3 ">
                          {doctorData.data?.name}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} alt="star icon" />
                            {doctorData.data?.averageRating}
                          </span>
                          <span className=" text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({doctorData.data?.totalRating})
                          </span>
                        </div>
                        <p className="text-para font-[15px] lg:max-w-[390px] leading-6">
                          {doctorData.data?.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={doctorData.data?.name}
                      about={doctorData.data?.about}
                      qualifications={doctorData.data?.qualifications}
                      experiences={doctorData.data?.experiences}
                    />
                  </div>
                )}

                {tab === "appointments" && (
                  <DoctorAppointment appointments={doctorData.appointments} />
                )}
                {tab === "settings" && (
                  <DoctorProfile
                    doctorData={doctorData.data}
                    refetchProfile={refetchProfile}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorAccount;
