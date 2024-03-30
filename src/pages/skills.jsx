import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skillsList } from "../redux/slice/skillSlice";
import cv from "../assets/cv/test.pdf";
const Skill = () => {
  const { userSkillsListData } = useSelector((state) => state.skill);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(skillsList(""));
  }, [dispatch]);

  const handleDownload = () => {
    const pdfUrl = cv;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Resume.pdf"; // Set the filename for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const progress = 10;
  const percentageProgress = (progress * 10)
  console.log('data??????', userSkillsListData);
  return (
    <>
      <div className="skillPage" id="skill-page">
        <div className="container">
          <div className="row text-start mt-4 my-4">
            <p className="fw-bolder fs-2 my-4">My Skills</p>
            <div className="row">
              {userSkillsListData.data?.map((item, i) => {
                return (
                  <div className="col-6 " key={i}>
                    <p className="fw-bolder my-2">{item?.title}</p>
                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="10"
                      style={{ height: "12px" }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
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
            <div className="downloadCV col-2 text-center  my-4">
              <button
                id="submit-btn"
                className="downloadCV btn text-white rounded-0"
                type="submit"
                onClick={handleDownload}
              >
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skill;
