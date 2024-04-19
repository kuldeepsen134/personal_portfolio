import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createContactUs } from "../redux/slice/contactusSlice";

const ContactUS = () => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      mobile: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createContactUs(values));
        resetForm();
      } catch (error) {
        console.error(error.message);
        // Handle error
      }
    },
  });

  return (
    <div className="contactUS" id="contactMe">
      <div className="container">
        <div className="row mt-4 pt-4 py-4">
          <div className="col-sm-6 mt-4 ">
            <h2 className="fw-bold">Let's get in touch</h2>
            <p>
              I enjoy discussing new projects and design challenges. Please
              share as much info, as possible so we can get the most out of
              our first catch-up.
            </p>
            <span className="fw-bold">Living In:</span>
            <p className="">Nanda nagar, Indore (M.P.) India</p>
            <span className="fw-bold">Call: </span>
            <a href="tel:+6261132091" aria-label="6261132091">6261132091</a>
          </div>
          <div className="col-sm-6 mt-4">
            <h2 className="fw-bold">Contact US </h2>
            <form
              id="contact-form"
              onSubmit={formik.handleSubmit}
              className="form-border"
            >
              <div className="row g-4 ">
                <div className="col-12">
                  <label className="form-label" htmlFor="name">
                    Your Name:
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`form-control py-1 ${
                      formik.touched.name && formik.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    required=""
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="invalid-feedback">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="email">
                    Your Email Address:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control py-1 ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    required=""
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="mobile">
                    Your Mobile number:
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    className={`form-control py-1 ${
                      formik.touched.mobile && formik.errors.mobile
                        ? "is-invalid"
                        : ""
                    }`}
                    required=""
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className="invalid-feedback">
                      {formik.errors.mobile}
                    </div>
                  ) : null}
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="message">
                    How can I Help you?:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-control py-1 ${
                      formik.touched.message && formik.errors.message
                        ? "is-invalid"
                        : ""
                    }`}
                    required=""
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.touched.message && formik.errors.message ? (
                    <div className="invalid-feedback">
                      {formik.errors.message}
                    </div>
                  ) : null}
                </div>
                <div className=" text-center ">
                  <button
                    type="submit"
                    className="workBtn btn text-white rounded-0 px-5"
                    disabled={!formik.isValid}
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
  );
};

export default ContactUS;
