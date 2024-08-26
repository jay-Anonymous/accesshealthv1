/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../../util/upload-cloudinary";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { URL } from "../../../constant/config";
import { useAuth } from "../../../context/AuthContext";
import useToken from "../../../hooks/useToken";

const DoctorProfile = ({ doctorData, refetchProfile }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: "",
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();
  const token = useToken();

  useEffect(() => {
    setFormData({
      name: doctorData?.name || "",
      email: doctorData?.email || "",
      password: doctorData?.password || "",
      phone: doctorData?.phone || "",
      bio: doctorData?.bio || "",
      gender: doctorData?.gender || "",
      specialization: doctorData?.specialization || "",
      ticketPrice: doctorData?.ticketPrice || "",
      qualifications: doctorData?.qualifications || "",
      experiences: doctorData?.experiences || "",
      timeSlots: doctorData?.timeSlots || "",
      about: doctorData?.about || "",
      photo: doctorData?.photo || "",
    });
  }, [doctorData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    setLoading(true);
    try {
      const res = await uploadImageToCloudinary(file);
      setFormData({ ...formData, photo: res.url });
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(URL + "/doctors/" + doctorData._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.errors);
      }

      toast.success(result.message);
      dispatch({
        type: "UPDATE_USER",
        payload: { photo: formData.photo },
      });
      refetchProfile();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addItem = (key, items) => {
    setFormData((prevstate) => ({
      ...prevstate,
      [key]: [...prevstate[key], items],
    }));
  };

  const deleteItem = (key, index) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: prevState[key].filter((_, i) => index !== i),
    }));
  };

  const handleReusableInput = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevState) => {
      const updateItems = [...prevState[key]];

      updateItems[index][name] = value;

      return { ...prevState, [key]: updateItems };
    });
  };

  const addQualification = (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInput("qualifications", index, event);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();

    deleteItem("qualifications", index);
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handleExperienceChange = (e, index) => {
    handleReusableInput("experiences", index, e);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();

    deleteItem("experiences", index);
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", { day: "", startingTime: "", endingTime: "" });
  };

  const handleTimeSlotChange = (e, index) => {
    handleReusableInput("timeSlots", index, e);
  };

  const deleteTimeSlot = (e, index) => {
    deleteItem("timeSlots", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form-label">Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Full name"
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="mb-5">
          <p className="form-label">Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleInputChange}
            className="form-input"
            readOnly
            aria-readonly
            disabled
          />
        </div>
        <div className="mb-5">
          <p className="form-label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            placeholder="Bio"
            onChange={handleInputChange}
            className="form-input"
            maxLength={100}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form-label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form-input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <p className="form-label">Specializations*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form-input py-3.5"
              >
                <option value="">Select</option>
                <option value="Dental">Dental</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="ophthalmologists"> General Practitioner</option>
              </select>
            </div>
            <div>
              <p className="form-label">Price*</p>
              <input
                type="number"
                placeholder="100.000"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                className="form-input py-2.5"
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form-label">Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form-label">Starting Date*</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    className="form-input"
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
                <div>
                  <p className="form-label">Ending Date*</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    className="form-input"
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form-label">Degree*</p>
                  <input
                    type="text"
                    name="degree"
                    value={item.degree}
                    className="form-input"
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
                <div>
                  <p className="form-label">University*</p>
                  <input
                    type="text"
                    name="university"
                    value={item.university}
                    className="form-input"
                    onChange={(e) => handleQualificationChange(e, index)}
                  />
                </div>
              </div>

              <button
                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                aria-label="reset qualification"
                onClick={(e) => deleteQualification(e, index)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            className={`btn py-2 px-5 mt-0  rounded ${
              formData.qualifications.length > 2 &&
              "cursor-not-allowed bg-blue-400"
            }`}
            disabled={formData.qualifications.length > 2}
            aria-label="add qualification"
            onClick={addQualification}
          >
            Add Qualification
          </button>
        </div>
        <div className="mb-5">
          <p className="form-label">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form-label">Starting Date*</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    className="form-input"
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                </div>
                <div>
                  <p className="form-label">Ending Date*</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    className="form-input"
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form-label">Position*</p>
                  <input
                    type="text"
                    name="position"
                    value={item.position}
                    className="form-input"
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                </div>
                <div>
                  <p className="form-label">Hospital*</p>
                  <input
                    type="text"
                    name="hospital"
                    value={item.hospital}
                    className="form-input"
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                </div>
              </div>

              <button
                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                aria-label="reset qualification"
                onClick={(e) => deleteExperience(e, index)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            className={`${
              formData.experiences.length > 2 &&
              "cursor-not-allowed bg-blue-400"
            } btn py-2 px-5 mt-0 rounded`}
            aria-label="add experience"
            disabled={formData.experiences.length > 2}
            onClick={addExperience}
          >
            Add Experience
          </button>
        </div>
        <div className="mb-5">
          <p className="form-label">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                <div>
                  <p className="form-label">Day*</p>
                  <select
                    name="day"
                    value={item.day}
                    className="form-input py-3.5"
                    onChange={(e) => handleTimeSlotChange(e, index)}
                  >
                    <option value="">Select</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thrusday">Thrusday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>
                <div>
                  <p className="form-label">Starting Time*</p>
                  <input
                    type="time"
                    name="startingTime"
                    value={item.startingTime}
                    className="form-input py-2"
                    onChange={(e) => handleTimeSlotChange(e, index)}
                  />
                </div>
                <div>
                  <p className="form-label">Ending Time*</p>
                  <input
                    type="time"
                    name="endingTime"
                    value={item.endingTime}
                    className="form-input py-2"
                    onChange={(e) => handleTimeSlotChange(e, index)}
                  />
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 mb-[30px] cursor-pointer"
                    aria-label="reset qualification"
                    onClick={(e) => deleteTimeSlot(e, index)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn py-2 px-5 mt-0  rounded"
            aria-label="add timeslot"
            onClick={addTimeSlot}
          >
            Add TimeSlot
          </button>
        </div>
        <div className="mb-5">
          <p className="form-label">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form-input"
          ></textarea>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-solid border-primaryColor flex justify-center items-center">
              <source srcSet={formData.photo} type="image/webp"></source>
              <img
                src={formData.photo}
                alt="profile image"
                className="w-full h-full rounded-full object-contain object-center"
                loading="lazy"
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[40px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              accept=".jpg, .png"
              onChange={handleFileChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute  top-0 left-0 w-full h-full flex items-center  px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            aria-label="update profile button"
            onClick={handleUpdateProfile}
            disabled={loading}
            className="btn w-full text-white  text-[18px] leading-[30px] py-3 px-4 rounded-lg"
          >
            {loading ? (
              <HashLoader size={18} color="#ffffff" />
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
