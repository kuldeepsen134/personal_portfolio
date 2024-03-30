import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { educationsList, } from "../redux/slice/resumeSlice.js";
import { experienceList } from "../redux/slice/experience.js";

const Resume = () => {
  const { userEducationListData } = useSelector((state) => state.resume);

  const { experienceListData } = useSelector((state) => state.experience);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(educationsList(""));
    dispatch(experienceList(""));
  }, [dispatch]);

  return (
    <>
      <div className="">
        <div className="container">
          <div className="text-center"></div>
          <div className="row text-center mt-4 my-4">
            <span className="fw-bolder fs-2">A summary of My CV</span>
          </div>
          <div className="row">
            <div className="col-5 border-start border-2 border-warning ps-3">
              <span className="fw-bolder fs-2">My Education</span>
              <hr className="bg-warning border-3 border-top border-warning" />
              {userEducationListData?.data?.map((item, i) => {
                return (
                  <div className="" key={i}>
                    <p className="fw-bolder fs-4">{item?.program}</p>
                    <p>{item?.institute}</p>
                    <p>{item?.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="col-5 border-start border-2 border-warning ps-3">
              <span className="fw-bolder fs-2">My Experience</span>
              <hr className="bg-warning border-4 border-top border-warning" />
              {experienceListData?.data?.map((item, i) => {
                return (
                  <div className="" key={i}>
                    <p className="fw-bolder fs-4">{item?.title}</p>
                    <p>
                      {item?.companyName}
                      {"/"}
                      {item.joiningDate}
                    </p>
                    <p>{item?.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
