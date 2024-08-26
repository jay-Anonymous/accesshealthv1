import React from "react";
import DoctorCard from "../../elements/DoctorCard";

const OurdoctorSection = () => {
  return (
    <section>
      <div className="container">
        <div className="max-w-[470px] mx-auto">
          <h2 className="heading text-center">Our great doctors</h2>
          <p className="text-para text-center">
            World-class care for every-one. Our System offers unmatched, expert
            health care.
          </p>
        </div>
        <DoctorCard />
      </div>
    </section>
  );
};

export default OurdoctorSection;
