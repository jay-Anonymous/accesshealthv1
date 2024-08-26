import React, { useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../constant/config";
import HashLoading from "react-spinners/HashLoader";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ from: "", subject: "", text: "" });

  const handleSendGmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(URL + "/gmail/send", {
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

      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-para">
          Got a technical issue? Want to send feedback about beta feature? Let
          us know
        </p>
        <form onSubmit={handleSendGmail} className="space-y-8">
          <div>
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              name="from"
              placeholder="example@gmail.com"
              className="form-input"
              value={formData.from}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="subject" className="form-label">
              Your Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Let us know how can help you"
              className="form-input"
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form-label">
              Your Message
            </label>
            <textarea
              rows={6}
              type="text"
              id="message"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Leave a comment..."
              className="form-input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn rounded sm:w-fit"
          >
            {loading ? <HashLoading size={18} color="#ffffff" /> : " Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
