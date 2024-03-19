import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skillsList } from "../redux/slice/skillSlice";

const Skill = () => {
  const {
    userSkillsData: { data },
  } = useSelector((state) => state.skill);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(skillsList(""));
  }, [dispatch]);

  return (
    <>
      <div className="" id="skill-page">
        <div className="container">
          <div className="row text-start">
            <h2 className="fw-bolder">My Skills</h2>
            <div className="row">
              {data &&
                data?.map((item, i) => {
                  return (
                    <div className="col-6 " key={i}>
                      <img
                        className="avatar"
                        src={`${process.env.REACT_APP_API_BASE_URL}${item?.techLogo}`}
                        alt={item.title}
                        width={50}
                        height={50}
                      />
                      <p className="fw-bolder">{item?.title}</p>
                      <div
                        className="progress"
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div className="progress-bar"></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="downloadCV col-2 text-center ">
              <button
                id="submit-btn"
                className="downloadCV btn text-white rounded-0"
                type="submit"
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
