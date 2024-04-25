import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  getProjectData,
  projectDelete,
  projectList,
} from "../../redux/slice/projectSlice";
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

  const {
    projectListData: { data },
    projectData,
  } = useSelector((state) => state.project);
  const dispatch = useDispatch();

    /* Add New project */

    const formik = useFormik({
    initialValues: {
      title: "",
      short_desc: "",
      description: "",
      github: "",
      media: [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      // Append non-file fields
      formData.append("title", values.title);
      formData.append("short_desc", values.short_desc);
      formData.append("description", values.description);
      formData.append("github", values.github);
      formData.append("liveURL", values.liveURL);

      // Append file(s)
      for (let i = 0; i < values.media.length; i++) {
        formData.append("media", values.media[i]);
      }
      try {
        const result = await dispatch(createProject(formData));
        setNewProject(result);
      } catch (error) {
        console.error("Project creation failed:", error);
      }
    },
  });

  const editFormik = useFormik({
    initialValues: {
      title: "",
      short_desc: "",
      description: "",
      github: "",
      media: [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      // Append non-file fields
      formData.append("title", values.title);
      formData.append("short_desc", values.short_desc);
      formData.append("description", values.description);
      formData.append("github", values.github);
      formData.append("liveURL", values.liveURL);

      // Append file(s)
      for (let i = 0; i < values.media.length; i++) {
        formData.append("media", values.media[i]);
      }
      try {
        const result = await dispatch(createProject(formData));

        setNewProject(result);
      } catch (error) {
        console.error("Project creation failed:", error);
      }
    },
  });

  const handleDeleteProject = (id) => {
    setProjectId(id);
    dispatch(projectDelete(id));
  };

  const toggleRowExpansion = (index) => {
    setExpandedRowIndex(expandedRowIndex === index ? null : index);
  };

  useEffect(() => {
    dispatch(projectList(""));
  }, [dispatch, projectId, newProject]);

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
                    {project?.media?.map((img, index) => (
                      <div
                        key={index}
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
                      </div>
                    ))}
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
        {/* Add New project */}
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
                  Add new project
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
                      name="media"
                      multiple
                      className="form-control"
                      placeholder="Image"
                      accept="image/*"
                      onChange={(e) =>
                        formik.setFieldValue("media", e.currentTarget.files)
                      }
                    />

                    <label htmlFor="floatingPassword">Image</label>
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
                onSubmit={editFormik.handleSubmit}
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
                      onChange={editFormik.handleChange}
                      value={editFormik.values.title || projectData.title}
                    />
                    <label htmlFor="floatingInput">Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      name="short_desc"
                      onChange={editFormik.handleChange}
                      value={
                        editFormik.values.short_desc || projectData.short_desc
                      }
                    />
                    <label htmlFor="floatingInput">Short description</label>
                  </div>
                  <div className="form-floating  mb-3">
                    <input
                      type="file"
                      name="media"
                      multiple
                      className="form-control"
                      placeholder="Image"
                      accept="image/*"
                      onChange={(e) =>
                        editFormik.setFieldValue("media", e.currentTarget.files)
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
                      onChange={editFormik.handleChange}
                      value={editFormik.values.github || projectData.github}
                    />
                    <label htmlFor="floatingPassword">Github</label>
                  </div>

                  <div className="form-floating  mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Live URL"
                      name="liveURL"
                      onChange={editFormik.handleChange}
                      value={editFormik.values.liveURL || projectData.liveURL}
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
                          editFormik.setFieldValue(
                            "image",
                            e.currentTarget.files
                          ) // Set the value for 'pic'
                      }
                    />
                    <label htmlFor="floatingPassword">Image</label>
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
