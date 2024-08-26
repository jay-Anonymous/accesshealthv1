import React from "react";
import faqImg from "../../../assets/images/faq-img.png";
import FaqAccordion from "../../elements/FaqAccordion";

const FaqSection = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between  gap-[50px] lg:gap-0">
          <div className="w-1/2 hidden md:block">
            <img src={faqImg} alt="faq-image" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="heading">Most questions by our beloved patients</h2>
            <FaqAccordion />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
