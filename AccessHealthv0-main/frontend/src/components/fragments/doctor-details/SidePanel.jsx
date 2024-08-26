// components/SidePanel.js
import React, { useState } from "react";
import useToken from "../../../hooks/useToken";
import { toast } from "react-toastify";
import { URL } from "../../../constant/config";

const SidePanel = ({ doctorId, price, timeSlots }) => {
  const [loading, setLoading] = useState(false);
  const token = useToken();

  const handleBooking = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}/bookings/checkout-session/${doctorId}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.errors || "Failed to create checkout session");
      }

      if (result.session.url) {
        window.location.href = result.session.url;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-para mt-0 font-semibold">Ticket Price</p>
        <span>Rp {price}</span>
      </div>
      <div className="mt-[30px]">
        <p className="text-para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots &&
            timeSlots.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <p className="text-[15px] leading-6 text-textColor font-semibold capitalize">
                  {item.day}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold capitalize">
                  {item.startingTime} - {item.endingTime}
                </p>
              </li>
            ))}
        </ul>
      </div>
      <button
        aria-label="button booking"
        onClick={handleBooking}
        className="btn px-2 w-full rounded-md"
        disabled={loading}
      >
        {loading ? "Loading..." : "Book Appointment"}
      </button>
    </div>
  );
};

export default SidePanel;
