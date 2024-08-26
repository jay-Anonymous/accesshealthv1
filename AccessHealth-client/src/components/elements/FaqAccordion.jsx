import React, { useState } from "react";
import { faqs } from "../../data/faqs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ul className="mt-[38px]">
      {faqs.map((item, index) => (
        <li
          key={index}
          className="p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer"
          onClick={() => handleToggleAccordion(index)}
        >
          <div className="flex justify-between items-center gap-5">
            <h4 className="text-base leading-7 lg:text-[18px] lg:leading-8 text-headingColor">
              {item.question}
            </h4>
            <div
              className={`${
                openIndex === index
                  ? "bg-primaryColor text-white border-none"
                  : ""
              } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-slate-900 rounded flex items-center justify-center`}
            >
              {openIndex === index ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>
          </div>
          {openIndex === index && (
            <div className="mt-4">
              <p className="text-[14px] leading-6 lg:text-base lg:leading-7 font-normal text-textColor">
                {item.content}
              </p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FaqAccordion;
