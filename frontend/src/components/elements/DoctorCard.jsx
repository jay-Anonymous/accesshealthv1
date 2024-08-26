import { useState, useEffect } from "react";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import useFetchData from "../../hooks/useFetchData";
import { URL } from "../../constant/config";

const DoctorCard = () => {
  const { data, loading, errors } = useFetchData(URL + "/doctors/");
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    if (data) {
      const doctors = data.sort((a, b) => b.totalRating - a.totalRating);
      const threeDoc = doctors.slice(0, 3);

      setDoctor(threeDoc);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-4 mobile:grid-cols-12 lg:grid-cols-9 mt-[30px] gap-6">
      {doctor.map((doctor, index) => (
        <div
          key={doctor._id}
          className="p-3 xl:p-5 col-span-full mobile:col-span-6 md:col-span-4 lg:col-span-3"
        >
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
            <Link
              to={"/doctors"}
              className="w-11 h-11 mt-4 rounded-full border border-solid border-slate-800 mt-30px mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
            >
              <BsArrowRight className="group-hover:text-white" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCard;
