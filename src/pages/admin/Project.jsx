import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjectData, projectDelete, projectList } from "../../redux/slice/projectSlice";
import { LuClipboardEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosLink } from "react-icons/io";
import { useFormik } from "formik";

const ProjectPage = () => {
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [projectId, setProjectId] = useState("");
  const [editeProject, setediteProject] = useState("");

  const [newProject, setNewProject] = useState({});

  const { projectListData: { data }, projectData } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      short_desc: "",
      description: "",
      photoes: [],
      video: [],
      github: "",
      image: "",
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        // Check if the field is a file input and a new file is provided
        if (value instanceof File) {
          formData.append(key, value); // Append the new file
        } else if (value) {
          formData.append(key, value); // Append other non-empty fields
        }
      });

      try {
        const result = await dispatch(createProject(formData));
        setNewProject(result);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  const handleDeleteProject = (id) => {
    setProjectId(id);
    dispatch(projectDelete(id));
  };

  useEffect(() => {
    dispatch(projectList(""));
  }, [dispatch, projectId, newProject]);


  const toggleRowExpansion = (index) => {
    setExpandedRowIndex(expandedRowIndex === index ? null : index);
  };

  useEffect(() => {
    dispatch(getProjectData(editeProject));
  }, [dispatch, editeProject]);

  const renderDescription = (description, index) => {
    if (expandedRowIndex === index) {
      return (
        <div>
          {description}
          <button
            onClick={() => toggleRowExpansion(index)}
            className="btn btn-link"
          >
            Read Less
          </button>
        </div>
      );
    } else {
      return (
        <div>
          {description.slice(0, 50)}
          {description.length > 50 && (
            <button
              onClick={() => toggleRowExpansion(index)}
              className="btn btn-link"
            >
              Read More
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <div className="project py-5">
      <div className="container">
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add new Project
          </button>
        </div>
        <div style={{ overflowX: "auto" }} className="mt-4">
          <table className="table table-bordered w-auto">
            <thead>
              <tr className="text-center">
                <th style={{ width: "5px" }}>Id</th>
                <th style={{ width: "20%" }}>Title</th>
                <th style={{ width: "40%" }}>Short Description</th>
                <th style={{ width: "40%" }}>Description</th>
                <th style={{ width: "60%" }}>Photos</th>
                <th style={{ width: "10%" }}>Video</th>
                <th style={{ width: "10%" }}>Github</th>
                <th style={{ width: "20%" }}>Live URL</th>
                <th style={{ width: "40%" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((project, index) => (
                <tr key={project._id}>
                  <th scope="row">{project._id}</th>
                  <td>{project.title}</td>
                  <td className="">
                    {renderDescription(project.short_desc, index)}
                  </td>
                  <td>{renderDescription(project.description, index)}</td>

                  <td>
                    {project?.photoes?.map((img, index) => (
                      <div
                        id="carouselExampleControls"
                        className="carousel slide"
                        data-bs-ride="carousel"
                      >
                        <div className="carousel-inner">
                          <div key={index} className="carousel-item active">
                            <img
                              src={`${process.env.REACT_APP_API_BASE_URL}${img}`}
                              className="d-block w-100"
                              alt="..."
                            />
                          </div>
                        </div>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          />
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          />
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    ))}
                  </td>
                  <td>
                    <video controls width="100%">
                      <source
                        src={`${process.env.REACT_APP_API_BASE_URL}${project.video}`}
                        type="video/mp4"
                      />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  </td>

                  <td>
                    <Link to={project.github}>
                      <FaGithub />
                    </Link>
                  </td>
                  <td>
                    <Link to={project.liveURL}>
                      <IoIosLink />
                    </Link>
                  </td>
                  <td className="d-flex">
                    <button
                      type="button"
                      className="btn btn-primary mx-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editProject"
                      onClick={() => setediteProject(project?._id)}
                    >
                      <LuClipboardEdit />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(project._id)}
                      className="btn btn-danger mx-2"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                  Add new project{" "}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
                className="edit-profile-form"
              >
                <div className="modal-body">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      name="title"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                    <label htmlFor="floatingInput">Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      name="short_desc"
                      onChange={formik.handleChange}
                      value={formik.values.short_desc}
                    />
                    <label htmlFor="floatingInput">Short description</label>
                  </div>
                  <div className="form-floating  mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      name="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    />
                    <label htmlFor="floatingPassword">Description</label>
                  </div>

                  <div className="form-floating  mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Github"
                      name="github"
                      onChange={formik.handleChange}
                      value={formik.values.github}
                    />
                    <label htmlFor="floatingPassword">Github</label>
                  </div>

                  <div className="form-floating  mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Live URL"
                      name="liveURL"
                      onChange={formik.handleChange}
                      value={formik.values.liveURL}
                    />
                    <label htmlFor="floatingPassword">Live URL</label>
                  </div>

                  <div className="form-floating  mb-3">
                    <input
                      type="file"
                      name="image"
                      multiple
                      className="form-control"
                      placeholder="Image"
                      accept="image/*"
                      onChange={
                        (e) =>
                          formik.setFieldValue("image", e.currentTarget.files) // Set the value for 'pic'
                      }
                    />
                    <label htmlFor="floatingPassword">Image</label>
                  </div>
                  <div className="form-floating  mb-3">
                    <input
                      type="file"
                      name="video"
                      multiple
                      className="form-control"
                      placeholder="Video"
                      accept="video/*"
                      onChange={
                        (e) =>
                          formik.setFieldValue("video", e.currentTarget.files) // Set the value for 'pic'
                      }
                    />
                    <label htmlFor="floatingPassword">Video</label>
                  </div>
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
              </form>
            </div>
          </div>
        </div>

        {/* Edit project */}

        <div
          className="modal fade"
          id="editProject"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="editProjectLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editProjectLabel">
                  Edit project{" "}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
                className="edit-profile-form"
              >
                <div className="modal-body">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      name="title"
                      onChange={formik.handleChange}
                      value={formik.values.title || projectData.title}
                    />
                    <label htmlFor="floatingInput">Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      name="short_desc"
                      onChange={formik.handleChange}
                      value={formik.values.short_desc || projectData.short_desc}
                    />
                    <label htmlFor="floatingInput">Short description</label>
                  </div>
                  <div className="form-floating  mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      name="description"
                      onChange={formik.handleChange}
                      value={
                        formik.values.description || projectData.description
                      }
                    />
                    <label htmlFor="floatingPassword">Description</label>
                  </div>

                  <div className="form-floating  mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Github"
                      name="github"
                      onChange={formik.handleChange}
                      value={formik.values.github || projectData.github}
                    />
                    <label htmlFor="floatingPassword">Github</label>
                  </div>

                  <div className="form-floating  mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Live URL"
                      name="liveURL"
                      onChange={formik.handleChange}
                      value={formik.values.liveURL || projectData.liveURL}
                    />
                    <label htmlFor="floatingPassword">Live URL</label>
                  </div>

                  <div className="form-floating  mb-3">
                    <input
                      type="file"
                      name="image"
                      multiple
                      className="form-control"
                      placeholder="Image"
                      accept="image/*"
                      onChange={
                        (e) =>
                          formik.setFieldValue("image", e.currentTarget.files) // Set the value for 'pic'
                      }
                    />
                    <label htmlFor="floatingPassword">Image</label>
                  </div>
                  <div className="form-floating  mb-3">
                    <input
                      type="file"
                      name="video"
                      multiple
                      className="form-control"
                      placeholder="Video"
                      accept="video/*"
                      onChange={
                        (e) =>
                          formik.setFieldValue("video", e.currentTarget.files) // Set the value for 'pic'
                      }
                    />
                    <label htmlFor="floatingPassword">Video</label>
                  </div>
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
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
