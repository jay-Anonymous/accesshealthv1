import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../util/upload-cloudinary";
import { URL } from "../../constant/config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Register = () => {
  const [selectFile, setSelectFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectFile,
    role: "patient",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    try {
      // Upload image to Cloudinary
      const data = await uploadImageToCloudinary(file);

      // Update previewUrl, selectFile, and formData
      setPreviewUrl(data.url);
      setSelectFile(data.url);
      setFormData({ ...formData, photo: data.url });
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
      const res = await fetch(URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message, errors } = await res.json();
      if (!res.ok) {
        throw new Error(errors);
      }

      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <div className="mb-6 flex justify-between items-center">
        <label htmlFor="role">
          Are you a :
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleInputChange}
            className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
          >
            <option value={"patient"}>Patient</option>
            <option value={"doctor"}>Doctor</option>
          </select>
        </label>
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
        {selectFile && (
          <figure className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-solid border-primaryColor flex justify-center items-center">
            <img
              src={previewUrl}
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
          disabled={loading}
          type="submit"
          aria-label="button login"
          className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
        >
          {loading ? <HashLoader size={18} color={`#ffffff`} /> : "Sign Up"}
        </button>
      </div>

      <p className="mt-5 text-textColor text-center">
        Already have an account?{" "}
        <Link to={"/login"} className="text-primaryColor ml-1 font-medium">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
