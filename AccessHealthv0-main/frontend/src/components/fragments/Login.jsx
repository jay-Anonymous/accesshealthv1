import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../constant/config";
import { useAuth } from "../../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(URL + "/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.errors);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: result.data, role: result.role, token: result.token },
      });

      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-4 md:py-0">
      <div className="mb-5">
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={formData.email}
          onChange={handleChangeFormData}
          className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  "
        />
      </div>
      <div className="mb-5">
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          value={formData.password}
          onChange={handleChangeFormData}
          className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  "
        />
      </div>
      <div className="mt-7">
        <button
          type="submit"
          aria-label="button login"
          className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
        >
          {loading ? <HashLoader size={18} color="#ffffff" /> : "Sign In"}
        </button>
      </div>

      <p className="mt-5 text-textColor text-center">
        Don't have an account?{" "}
        <Link to={"/register"} className="text-primaryColor ml-1 font-medium">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
