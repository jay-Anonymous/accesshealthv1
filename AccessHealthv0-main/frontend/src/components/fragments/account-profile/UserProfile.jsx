import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../../../util/upload-cloudinary";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { URL } from "../../../constant/config";
import useToken from "../../../hooks/useToken";
import { useAuth } from "../../../context/AuthContext";

const UserProfile = ({ user, refetchProfile }) => {
  const [selectFile, setSelectFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: null,
    photo: null,
    bloodType: "",
    gender: "",
  });

  const token = useToken();
  const { dispatch } = useAuth();

  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      photo: user.photo || "",
      gender: user.gender || "",
      bloodType: user.bloodType || "",
    });
  }, [user]);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(URL + "/users/" + user._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });
      const { message, errors } = await res.json();
      if (!res.ok) {
        throw new Error(errors);
      }

      toast.success(message);
      dispatch({ type: "UPDATE_USER", payload: { photo: formData.photo } });
      refetchProfile();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Enter Your Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  "
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-readonly
            readOnly
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  "
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid mt-1 border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  "
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid mt-1 border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  "
          />
        </div>
        <div className="mb-6 flex justify-between items-center">
          <label htmlFor="gender">
            Gender :
            <select
              name="gender"
              id="gender"
              onChange={handleInputChange}
              value={formData.gender}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option>Select</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
          </label>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-solid border-primaryColor flex justify-center items-center">
              <img
                src={formData.photo}
                alt="profile image"
                className="w-full h-full rounded-full object-contain object-center"
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
              {selectFile ? selectFile.name : "Upload Photo"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading}
            type="submit"
            aria-label="button login"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={18} color={`#ffffff`} /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
