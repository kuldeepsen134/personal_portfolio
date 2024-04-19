import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skillsList } from "../redux/slice/skillSlice";
import cv from "../assets/cv/kuldeepsen2023.pdf";

const Skill = () => {
  const { userSkillsListData } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(skillsList(""));
  }, [dispatch]);

  const handleDownload = () => {
    const pdfUrl = cv;
    // Open the PDF in a new tab/window instead of downloading it
    window.open(pdfUrl, "_blank");
  };

  const progress = 10;
  const percentageProgress = progress * 10;

  return (
    <>
      <div className="skillPage" id="skill-page">
        <div className="container">
          <div className="row text-start  py-4">
            <h2 className="fw-bolder text-center pb-5 my-4">My Skills</h2>
            <div className="row">
              {userSkillsListData.data?.map((item, i) => {
                return (
                  <div className="col-sm-6 " key={i}>
                    <p className="fw-bolder my-2">{item?.title}</p>
                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="10"
                      style={{ height: "12px" }}
                      title="skills-progress"

                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-label="percentage"

                        style={{
                          width: `${percentageProgress}%`,
                          height: "12px",
                          backgroundColor: progress < 5 ? "red" : "#ef7f07",
                        }}
                      >
                        {percentageProgress}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row justify-content-center mt-4" id="resume">
            <div className=" my-4 text-center">
              <button id="submit-btn" className="downloadCV btn text-white rounded-0 px-5" type="submit" onClick={handleDownload}>Download CV</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skill;
