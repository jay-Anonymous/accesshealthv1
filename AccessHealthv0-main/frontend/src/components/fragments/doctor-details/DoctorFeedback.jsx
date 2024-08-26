import React, { useState } from "react";
import avatar from "../../../assets/images/patient-avatar.png";
import { formatDate } from "../../../util/util";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const DoctorFeedback = ({ reviews, totalRating, refatchData }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      <div className="mb-[50px] ">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All Reviews ({totalRating})
        </h4>
        {reviews && (
          <div className="max-h-[50vh] w-full overflow-scroll scroll">
            {reviews.map((review, i) => (
              <div key={i} className="flex justify-between gap-10 mb-[30px] ">
                <div className=" flex gap-3">
                  <figure className="w-10 h-10 rounded-full">
                    <img
                      src={review.user.photo}
                      alt="avatar"
                      className="w-full"
                    />
                  </figure>
                  <div>
                    <h5 className="text-base leading-5 text-primaryColor font-bold">
                      {review.user.name}
                    </h5>
                    <p className="text-[14px] leading-6 text-textColor">
                      {formatDate(review.createdAt)}
                    </p>
                    <p className="text-para mt-3 font-medium text-[15px]">
                      {review.reviewText}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, index) => (
                    <AiFillStar key={index + 1} color="orange" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {!showFeedbackForm && (
          <div className="text-center">
            <button
              className="btn"
              aria-label="give feedback"
              onClick={() => setShowFeedbackForm(true)}
            >
              Give Feedback
            </button>
          </div>
        )}
        {showFeedbackForm && (
          <FeedbackForm
            refatchData={refatchData}
            setShowFeedbackForm={setShowFeedbackForm}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorFeedback;
