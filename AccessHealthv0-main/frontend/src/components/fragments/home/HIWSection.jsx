import React from "react";
import icon1 from "../../../assets/images/icon01.png";
import icon2 from "../../../assets/images/icon02.png";
import icon3 from "../../../assets/images/icon03.png";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
const HIWSection = () => {
  return (
    <section>
      <div className="container">
        <div className="lg:w-[470px] mx-auto">
          <h2 className="heading text-center">
            Providing the best medical services
          </h2>
          <p className="text-para text-center">
            World-class care for every-one. Our health System offers unmatched,
            expected health care.{" "}
          </p>
        </div>
        <div className="grid grid-cols-4 mobile:grid-cols-12 xl:grid-cols-9 mt-20 gap-4">
          <div className="col-span-full  mobile:col-span-4  xl:col-span-3">
            <figure className="w-full h-32">
              <img
                src={icon1}
                alt="icon1"
                className="w-full h-full object-contain object-center"
              />
            </figure>

            <div className="mt-8">
              <h3 className="text-center text-lg text-textColor font-bold">
                Find a Doctor
              </h3>
              <p className="text-base leading-7 text-textColor font-normal mt-4 text-center">
                Word-class care for everyone. Our health System offers
                unmatched. expert health care. From the lab to the clinic.
              </p>
            </div>
            <Link
              to={"/doctors"}
              className="w-11 h-11 mt-4 rounded-full border border-solid border-slate-800 mt-30px mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
            >
              <BsArrowRight className="group-hover:text-white" />
            </Link>
          </div>
          <div className="col-span-full  mobile:col-span-4  xl:col-span-3">
            <figure className="w-full h-32">
              <img
                src={icon2}
                alt="icon2"
                className="w-full h-full object-contain object-center"
              />
            </figure>
            <div className="mt-8">
              <h3 className="text-center text-lg text-textColor font-bold">
                Find a Location
              </h3>
              <p className="text-base leading-7 text-textColor font-normal mt-4 text-center">
                Word-class care for everyone. Our health System offers
                unmatched. expert health care. From the lab to the clinic.
              </p>
            </div>
            <Link
              to={"/doctors"}
              className="w-11 h-11 mt-4 rounded-full border border-solid border-slate-800 mt-30px mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
            >
              <BsArrowRight className="group-hover:text-white" />
            </Link>
          </div>

          <div className="col-span-full  mobile:col-span-4  xl:col-span-3">
            <figure className="w-full h-32">
              <img
                src={icon3}
                alt="icon3"
                className="w-full h-full object-contain object-center"
              />
            </figure>
            <div className="mt-8">
              <h3 className="text-center text-lg text-textColor font-bold">
                Book Appointment
              </h3>
              <p className="text-base leading-7 text-textColor font-normal mt-4 text-center">
                Word-class care for everyone. Our health System offers
                unmatched. expert health care. From the lab to the clinic.
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
      </div>
    </section>
  );
};

export default HIWSection;
