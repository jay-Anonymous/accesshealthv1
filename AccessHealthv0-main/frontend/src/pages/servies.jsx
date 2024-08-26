import React from "react";
import ServicesCard from "../components/elements/ServicesCard";

const ServicePage = () => {
  return (
    <section>
      <div className="container">
        <div className="xl:w-[470px] mx-auto">
          <h2 className="heading text-center">services</h2>
          <p className="text-para text-center">
            World-class care for every one. Our helth System offers unmatched,
            expert health care.
          </p>
        </div>
        <ServicesCard />
      </div>
    </section>
  );
};

export default ServicePage;
