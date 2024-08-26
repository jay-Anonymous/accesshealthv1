import React from "react";
import useFetchData from "../../../hooks/useFetchData";
import { URL } from "../../../constant/config";
import Loading from "../Loading";
import Error from "../Error";
import starIcon from "../../../assets/images/Star.png";
const UserBooking = () => {
  const {
    data: appointments,
    loading,
    errors,
  } = useFetchData(`${URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && <Loading />}
      {errors && <Error errMessage={errors} />}
      {!errors && !loading && appointments.length === 0 ? (
        <div className=" mt-5 w-full min-h-[calc(50vh-100px)] flex items-center justify-center">
          <h2 className=" text-center text-headingColor leading-7 text-[20px] font-semibold ">
            You did't book any doctor yet!
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-4 mobile:grid-cols-12 lg:grid-cols-9 mt-[30px] gap-6">
          {appointments.map((doctor, index) => (
            <div
              key={doctor._id}
              className="p-3 xl:p-5 col-span-full mobile:col-span-6 lg:col-span-4"
            >
              <p>{doctor.expiredAt}</p>
              <div>
                <img src={doctor.photo} alt={doctor.name} className="w-full" />
              </div>
              <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-bold mt-3 lg:mt-5">
                {doctor.name}
              </h2>

              <div className="mt-2 lg:mt-4 flex items-center justify-between">
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:px-6 text-[12px] leading-4 lg:text-[16]px lg:leading-7 font-semibold rounded">
                  {doctor.specialization}
                </span>

                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="rating" />
                    {doctor?.averageRating}
                  </span>
                  <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-normal text-textColor">
                    ({doctor?.totalRating})
                  </span>
                </div>
              </div>

              <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px]">
                    +{doctor?.reviews.length} patienst{" "}
                  </h3>
                  <p className="text-[14px] leading-6 font-normal">
                    {doctor?.experiences && doctor.experiences[0].hospital}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBooking;
