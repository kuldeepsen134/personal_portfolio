import React from "react";

const HireMe = () => {
  const scrollToHireMe = (id) => {
    const hireMe = document.getElementById(id);
    if (hireMe) {
      hireMe.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hireme">
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <p className="hiremeHeading text-center text-white fw-bolder fs-1">
              Interested in working with me?
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button
              className="hireMeBtn btn rounded-0 text-white fs-4"
              type="submit"
              onClick={() => scrollToHireMe("contactMe")}
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMe;
