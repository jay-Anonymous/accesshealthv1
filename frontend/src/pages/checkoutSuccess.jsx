import React from "react";
import { Link } from "react-router-dom";
import { FaCircle, FaCheck } from "react-icons/fa";

const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white p-6 md:mx-auto relative">
        <FaCircle className="w-24 h-24 fill-blue-800 mx-auto" />
        <FaCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 fill-green-400 mx-auto" />
        <FaCheck
          className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 fill-white  mx-auto transition-all duration-1000 ease-in-out`}
        />
      </div>
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Payment Success!
        </h3>
        <p className="text-gray-600 my-2">
          Thank You for completing your secure online payment.
        </p>
        <p>Have a great day!</p>
        <div className="py-10 text-center">
          <Link
            to={"/home"}
            className="px-12 bg-primaryColor font-semibold text-white py-3"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
