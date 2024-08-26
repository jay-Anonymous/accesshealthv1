import React from "react";
import aboutImg from "../../../assets/images/about.png";
import imageCard from "../../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section>
      <div className="container">
        <div className="flex  justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          <figure className="relative w-3/4  md:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="About-Img" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-10%] md:right-[-7%] lg:right-[22%]">
              <img src={imageCard} alt="About-card" />
            </div>
          </figure>
          <div className="w-full lg:w-1/2 xl:w-[670px] order1 lg:order-2">
            <h3 className="heading">Proud to be one of the nations best</h3>
            <p className="text-para">
              For 10 years in a row, Indonesia. News 5 World Report has
              recognized us as one of the best public hospitals in the Nation
              and #1 in South Jakarta.
            </p>

            <p className="text-para mt-8">
              Our best is something we strive for each day, caring for our
              patients-not looking back at what we accomplished but towards what
              we can do tomorrow. Providing the best.
            </p>
            <Link to={"/"}>
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
