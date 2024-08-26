import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import starIcon from "../assets/images/Star.png";
import useFetchData from "../hooks/useFetchData";
import { URL } from "../constant/config";
import HashLoader from "react-spinners/HashLoader";
import Loading from "../components/fragments/Loading";
import Notfound from "../components/fragments/Notfound";
import Error from "../components/fragments/Error";

const DoctorPage = () => {
  const [query, setQuary] = useState("");
  const [debounceQuery, setDebounceQuey] = useState("");

  const handleSearch = () => {
    setQuary(query.trim());
  };

  const {
    data: doctors,
    loading,
    errors,
  } = useFetchData(URL + "/doctors?query=" + debounceQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuey(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <section className="bg=[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-4 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor by name or specification"
              onChange={(e) => setQuary(e.target.value)}
            />
            <button
              type="button"
              aria-label="search"
              className="btn mt-0 rounded-tr-none rounded-br-none"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {loading && <Loading />}
          {errors && <Error errMessage={errors} />}
          {doctors.length === 0 && <Notfound />}
          {!loading && (
            <div className="grid grid-cols-4 mobile:grid-cols-12 lg:grid-cols-8 mt-[30px] gap-6">
              {doctors.map((doctor, index) => (
                <div
                  key={doctor._id}
                  className="p-3 xl:p-5 col-span-full xs:col-span-4  mobile:col-span-6 md:col-span-4 lg:col-span-2 xl:col-span-2"
                >
                  <div>
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full"
                    />
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
                        {doctor.averageRating}
                      </span>
                      <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-normal text-textColor">
                        ({doctor.totalRating})
                      </span>
                    </div>
                  </div>

                  <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px]">
                        +{doctor.totalPatients} patienst{" "}
                      </h3>
                      <p className="text-[14px] leading-6 font-normal">
                        {doctor.experiences[0].hospital}
                      </p>
                    </div>
                    <Link
                      to={`/doctors/${doctor._id}`}
                      className="w-11 h-11 mt-4 rounded-full border border-solid border-slate-800 mt-30px mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowRight className="group-hover:text-white" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DoctorPage;
