import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  createSkills,
  deleteSkill,
  skillsList,
  skillsListOne,
  updateSkill,
} from "../../redux/slice/skillSlice";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";

import { useFormik } from "formik";

const SkillsPage = () => {
  const dispatch = useDispatch();
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const { userSkillsListData, userSkillsData } = useSelector((state) => state.skill);

  const formik = useFormik({
    initialValues: {
      id: userSkillsData?._id || "",
      title: userSkillsData?.title || "",
      totalExp: userSkillsData?.totalExp || "",
      pic: "",
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      const { id, ...formData } = values;
      const formDataWithFile = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "pic" && value instanceof File) {
          formDataWithFile.append(key, value);
        } else if (value && key !== "pic") {
          formDataWithFile.append(key, value);
        }
      });

      try {
        await dispatch(updateSkill({ id, formData: formDataWithFile }));
        setIsUpdateSuccess((prev) => !prev);
      } catch (error) {
        console.error(error);
      }
    },
  });
  // Add new skills
  const addFormik = useFormik({
    initialValues: {
      title: "",
      totalExp: "",
      pic: "",
    },
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      const { id, ...formData } = values;
      const formDataWithFile = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "pic" && value instanceof File) {
          formDataWithFile.append(key, value);
        } else if (value && key !== "pic") {
          formDataWithFile.append(key, value);
        }
      });

      try {
        await dispatch(createSkills(formDataWithFile));
        setIsUpdateSuccess((prev) => !prev);
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    dispatch(skillsList(""));
  }, [dispatch, isUpdateSuccess, isDeleteSuccess]);

  const getSkill = (skillID) => {
    dispatch(skillsListOne(skillID));
  };

  const handleDelete = (id) => {
    dispatch(deleteSkill(id));
    setIsDeleteSuccess((prev) => !prev);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-end pb-5">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addSkillBtn"
          >
            <IoMdAddCircleOutline />
          </button>
        </div>
      </div>
      <div className="row">
        {userSkillsListData?.data?.map((item, i) => {
          return (
            <div className="col-3" key={i}>
              <div className="card">
                <div className="card-body">
                  <div className="">
                    <h5 className="card-title">{item.title}</h5>
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}${item.techLogo}`}
                      alt={item.title}
                      style={{ width: 50 }}
                      className="d- pb-3"
                    />
                    {/* Button trigger modal */}
                    <p className="card-text">{item.totalExp}</p>

                    <button
                      type="button"
                      className="btn btn-primary me-4"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        getSkill(item._id);
                      }}
                    >
                      <BiEdit />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger "
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Skill
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            {/* Edit Skill form */}
            <form className="skill-form" onSubmit={formik.handleSubmit}>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ID"
                    value={userSkillsData?._id}
                    disabled
                  />
                  <label htmlFor="floatingInput">ID</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                  <label htmlFor="floatingInput">Title</label>
                </div>

                <div className="form-floating  mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="totalExp"
                    placeholder="Total experience"
                    onChange={formik.handleChange}
                    value={formik.values.totalExp}
                  />
                  <label htmlFor="floatingPassword">Total experience</label>
                </div>

                <div className="form-floating  mb-3">
                  <input
                    type="file"
                    name="pic"
                    className="form-control"
                    placeholder="Image"
                    accept="image/*"
                    onChange={
                      (e) =>
                        formik.setFieldValue("pic", e.currentTarget.files[0]) // Set the value for 'pic'
                    }
                  />

                  <label htmlFor="floatingPassword">Image</label>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/*Add skill Modal */}
      <div
        className="modal fade"
        id="addSkillBtn"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="addSkillBtnLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addSkillBtnLabel">
                Add New Skill
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            {/* Add new Skill form */}

            <form className="skill-form" onSubmit={addFormik.handleSubmit}>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="title"
                    onChange={addFormik.handleChange}
                    value={addFormik.values.title}
                  />
                  <label htmlFor="floatingInput">Title</label>
                </div>

                <div className="form-floating  mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Total experience"
                    name="totalExp"
                    onChange={addFormik.handleChange}
                    value={addFormik.values.totalExp}
                  />
                  <label htmlFor="floatingPassword">Total experience</label>
                </div>

                <div className="form-floating  mb-3">
                  <input
                    type="file"
                    name="pic"
                    className="form-control"
                    placeholder="Profile picture"
                    accept="image/*"
                    onChange={
                      (e) =>
                        addFormik.setFieldValue("pic", e.currentTarget.files[0]) // Set the value for 'pic'
                    }
                  />
                  <label htmlFor="floatingPassword">Image</label>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
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

export default SkillsPage;
