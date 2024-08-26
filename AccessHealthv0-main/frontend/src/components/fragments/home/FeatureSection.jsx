import React from "react";
import featureImg from "../../../assets/images/feature-img.png";
import { Link } from "react-router-dom";
import videoIcon from "../../../assets/images/video-icon.png";
import avatarIcon from "../../../assets/images/avatar-icon.png";

const FeatureSection = () => {
  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <div className="xl:w-[670px]">
            <h2 className="heading">
              Get virtual treatment <br />
              anytime.
            </h2>
            <ul className="pl-4">
              <li>
                <p className="text-para">
                  1. Schedule the appointment directly
                </p>
              </li>
              <li>
                <p className="text-para">
                  2. Search for your physician here, and contact their office.
                </p>
              </li>
              <li>
                <p className="text-para">
                  3. View our physician who are accepting new patients, use the
                  online scheduling tool to select an appointment time.
                </p>
              </li>
            </ul>
            <Link to={"/"}>
              <button className="btn">Learn More</button>
            </Link>
          </div>
          <figure className="relative z-10 lg:w-[770px] flex justify-end mt-[50px] lg:mt-0">
            <img src={featureImg} alt="featureImg" />

            <div className="absolute w-[150px] lg:w-[248px] bg-white bottom-[50px] left-0 md:bottom-[60px] md:left-1 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px] lg:gap-3">
                  <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-semibold">
                    Tue, 24
                  </p>
                  <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-normal">
                    {" "}
                    10:00WIB
                  </p>
                </div>
                <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                  <img src={videoIcon} alt="icon" />
                </span>
              </div>

              <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-medium mt-2 lg:mt-4 rounded-full">
                Consultation
              </div>

              <figure className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                <img src={avatarIcon} alt="avatar" />
                <figcaption>
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-bold">
                    Dr. Novita Qurrota A'ini
                  </h4>
                </figcaption>
              </figure>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
