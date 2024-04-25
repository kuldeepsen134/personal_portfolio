import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skillsList } from "../redux/slice/skillSlice";
import cv from "../assets/cv/kuldeepsen2023.pdf";
import OwlCarousel from "react-owl-carousel";

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

  const owlOptions = {
    loop: true,
    margin: 20,
    items: 6,
    dots: true,
    nav: true,
    navText: [
      "<i class='fas fa-chevron-left'></i>",
      "<i class='fas fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1, // Display 1 item at 320px and below
      },
      768: {
        items: 3, // Display 3 items between 768px and 1023px
      },
      1024: {
        items: 4, // Display 4 items at 1024px and above
      },
      1260: {
        items: 6,
      },
    },
  };

  return (
    <>
      <div className="skillPage" id="skill-page">
        <div className="container">
          <div className="row text-start  py-4">
            <h2 className="fw-bolder text-center pb-5 my-4">My Skills</h2>
            <div className="row">
              <div class="home-demo">
                <OwlCarousel className="owl-theme" {...owlOptions}>
                  <div class="item">
                    <img
                      width="144"
                      height="144"
                      src="https://img.icons8.com/plasticine/100/react.png"
                      alt="react"
                    />
                  </div>
                  <div class="item">
                    <img
                      width="144"
                      height="144"
                      src="https://img.icons8.com/color/144/html-5--v1.png"
                      alt="html-5--v1"
                    />
                  </div>
                  <div class="item">
                    <img
                      width="144"
                      height="144"
                      src="https://img.icons8.com/fluency/144/tailwind_css.png"
                      alt="tailwind_css"
                    />
                  </div>
                  <div class="item">
                    <img
                      width="144"
                      height="144"
                      src="https://img.icons8.com/color/144/nodejs.png"
                      alt="nodejs"
                    />
                  </div>
                  <div class="item">
                    <img
                      width="144"
                      height="144"
                      src="https://img.icons8.com/fluency/144/mysql-logo.png"
                      alt="mysql-logo"
                    />
                  </div>
                  <div class="item">
                    <img
                      width="144"
                      height="144"
                      src="https://img.icons8.com/color/144/mongodb.png"
                      alt="mongodb"
                    />
                  </div>
                  <div class="item">
                    <img
                      width="144"
                      height="144"
                      src="https://img.icons8.com/color-glass/144/bootstrap.png"
                      alt="bootstrap"
                    />
                  </div>
                  <div class="item">
                    <img
                      width="144"
                      height="144"
                      src="https://img.icons8.com/color/144/css3.png"
                      alt="css3"
                    />
                  </div>
                  <div class="item">
                    <img
                      width="144"
                      height="144"
                      src="https://img.icons8.com/color/144/postgreesql.png"
                      alt="postgreesql"
                    />
                  </div>
                </OwlCarousel>
              </div>

              {/* {userSkillsListData.data?.map((item, i) => {
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
              })} */}
            </div>
          </div>
          <div className="row justify-content-center mt-4" id="resume">
            <div className=" my-4 text-center">
              <button
                id="submit-btn"
                className="downloadCV btn text-white rounded-0 px-5"
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
