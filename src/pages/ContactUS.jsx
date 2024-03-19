import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { createContactUs } from "../redux/slice/contactusSlice";

import {
  SlSocialLinkedin,
  SlSocialInstagram,
  SlSocialFacebook,
} from "react-icons/sl";
import { BsTwitterX } from "react-icons/bs";

const ContactUS = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      message: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createContactUs(values));
        resetForm();
      } catch (error) {
        console.error(error.message);
      }
    },
  });

  return (
    <>
      <div className="contactUS" id="contactMe">
        <div className="container">
          <div className="row mt-4 pt-4 py-4">
            <div className="col-6 mt-4 ">
              <h2 className="fw-bold">Let's get in touch</h2>
              <p>
                I enjoy discussing new projects and design challenges. Please
                share as much info, as possible so we can get the most out of
                our first catch-up.
              </p>
              <span className="fw-bold">Living In:</span>
              <p className="">30 Shacham street, Los Angeles, USA.</p>
              <span className="fw-bold">Call:</span>
              <span className="tel">(+060) 444 434 444</span>

              <div className="d-flex">
                <ul className="socialMedia d-flex m-4">
                  <li>
                    <SlSocialLinkedin />
                  </li>
                  <li>
                    <SlSocialInstagram />
                  </li>
                  <li>
                    <SlSocialFacebook />
                  </li>
                  <li>
                    <BsTwitterX />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6 mt-4">
              <h2 className="fw-bold">Contact US </h2>

              <form
                id="contact-form"
                onSubmit={formik.handleSubmit}
                className="form-border"
              >
                <div className="row g-4 ">
                  <div className="col-12">
                    <label className="form-label" htmlFor="name">
                      What is Your Name:
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control py-1"
                      required=""
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="email">
                      Your Email Address:
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control py-1"
                      required=""
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="email">
                      Your Mobile number:
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="mobile"
                      className="form-control py-1"
                      required=""
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="form-message">
                      How can I Help you?:
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      className="form-control py-1"
                      required=""
                      value={formik.values.message}
                      onChange={formik.handleChange}
                    ></textarea>
                  </div>
                  <div className="workBtn col-2 text-center ">
                    <button
                      type="submit"
                      className="workBtn btn text-white rounded-0"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUS;
