import React from "react";
import HeroSection from "../components/fragments/home/HeroSection";
import HIWSection from "../components/fragments/home/HIWSection";
import AboutSection from "../components/fragments/home/AboutSection";
import ServiceSection from "../components/fragments/home/ServiceSection";
import FeatureSection from "../components/fragments/home/FeatureSection";
import OurdoctorSection from "../components/fragments/home/OurdoctorSection";
import FaqSection from "../components/fragments/home/FaqSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <HIWSection />
      <AboutSection />
      <ServiceSection />
      <FeatureSection />
      <OurdoctorSection />
      <FaqSection />
    </>
  );
};

export default HomePage;
