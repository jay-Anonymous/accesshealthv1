import React from "react";
import heroImg1 from "../../../assets/images/hero-img01.png";
import heroImg2 from "../../../assets/images/hero-img02.png";
import heroImg3 from "../../../assets/images/hero-img03.png";

const HeroSection = () => {
  return (
    <section className="hero-section pt-[60px] 2xl:h-[800px]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
          <div>
            <div className="lg:w-[570px]">
              <h1 className="text-[36px] leading-[46px] text-headingColor font-extrabold md:text-[60px] md:leading-[70px]">
                We help patients live a healty, longer life.
              </h1>
              <p className="text-para">
                Schedule your appointment at Medicare with ease. Choose from our
                range of specialties. Take control of your health now!
              </p>
              <button className="btn">Request an Appointment</button>
            </div>
            <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
              <div>
                <h2 className="text-[36px] leading-[56px] lg:leading-[44px] font-bold">
                  10+
                </h2>
                <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                <p className="text-para">Years of Experience</p>
              </div>
              <div>
                <h2 className="text-[36px] leading-[56px] lg:leading-[44px] font-bold">
                  5+
                </h2>
                <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                <p className="text-para">Clinic Location</p>
              </div>
              <div>
                <h2 className="text-[36px] leading-[56px] lg:leading-[44px] font-bold">
                  100%
                </h2>
                <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                <p className="text-para">Patient SatisFacation</p>
              </div>
            </div>
          </div>
          <div className="flex gap-[30px] justify-end">
            <div>
              <img src={heroImg1} alt="hero-image1" className="w-full" />
            </div>
            <div className="mt-[30px]">
              <img
                src={heroImg2}
                alt="hero-image2"
                className="w-full mb-[30px]"
              />
              <img src={heroImg3} alt="hero-image3" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
