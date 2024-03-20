import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { skillsList, skillsListOne } from "../../redux/slice/skillSlice";
import { IoMdAddCircleOutline } from "react-icons/io";

const SkillsPage = () => {
  const [skillID, setSkillID] = useState("");

  const { userSkillsListData, userSkillsData } = useSelector(
    (state) => state.skill
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(skillsList(""));
  }, [dispatch]);

  useEffect(() => {
    if (skillID) {
      dispatch(skillsListOne(skillID));
    }
  }, [dispatch, skillID]);

  console.log(userSkillsData);
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary mx-4"
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
            <>
              <div className="col-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex">
                      <h5 className="card-title">{item.title}</h5>
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/${item.techLogo}`}
                        alt={item.title}
                      />
                      {/* Button trigger modal */}
                      <button
                        type="button"
                        className="btn btn-primary mx-4"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => {
                          setSkillID(item._id);
                        }}
                      >
                        <BiEdit />
                      </button>
                    </div>
                    <p className="card-text">{item.totalExp}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      {/* Modal */}
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
            <form className="skill-form">
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ID"
                    disabled
                  />
                  <label htmlFor="floatingInput">ID:{123465465465}</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="title"
                  />
                  <label htmlFor="floatingInput">Title</label>
                </div>

                <div className="form-floating  mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Total experience"
                  />
                  <label htmlFor="floatingPassword">Total experience</label>
                </div>

                <div className="form-floating  mb-3">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Image"
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
                  <button type="button" className="btn btn-primary">
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
            <form className="skill-form">
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="title"
                  />
                  <label htmlFor="floatingInput">Title</label>
                </div>

                <div className="form-floating  mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Total experience"
                  />
                  <label htmlFor="floatingPassword">Total experience</label>
                </div>

                <div className="form-floating  mb-3">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Image"
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
                  <button type="button" className="btn btn-primary">
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
