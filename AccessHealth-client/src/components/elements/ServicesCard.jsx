import React from "react";
import { services } from "../../data/services";
import { Link } from "react-router-dom";
import { BsArrowBarRight, BsArrowRight } from "react-icons/bs";

const ServicesCard = () => {
  return (
    <div className="grid grid-cols-4 mobile:grid-cols-12 xl:grid-cols-9 gap-5 mt-[30px] lg:mt-[55px]">
      {services.map((item, index) => (
        <div
          key={index + 1}
          className="col-span-full mobile:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3"
        >
          <div className="py-[30px] px-3 lg:px-5">
            <h2 className="text-[26px] leading-9 text-headingColor font-bold">
              {item.name}
            </h2>
            <p className="text-[16px] leading-7 font-medium text-textColor mt-4">
              {item.desc}
            </p>
          </div>
          <div className="flex items-center justify-between mt-[30px]">
            <Link
              to={"/doctors"}
              className="w-11 h-11 rounded-full boder mx-auto flex items-center justify-center border border-solid border-slate-800 group hover:bg-primaryColor hover:border-none"
            >
              <BsArrowRight className="group-hover:text-white" />{" "}
            </Link>
            <span
              className="w-11 h-11 flex items-center justify-center text-[18px] leading-[30px] font-semibold"
              style={{
                background: `${item.bgColor}`,
                color: `${item.textColor}`,
                borderRadius: "8px 0 0 8px",
              }}
            >
              {index + 1}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesCard;
