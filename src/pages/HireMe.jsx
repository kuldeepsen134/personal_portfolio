import React from "react";

const HireMe = () => {

  const scrollToHireMe = (id) => {
    const hireMe = document.getElementById(id);
    if (hireMe) {
      hireMe.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="hireme">
      <div className="container">
        <div className="row">
          <h2 className="text-center fw-bolder">
            Interested in working with me?
          </h2>
          <div className="text-center">
            <button
              className="hireMeBtn btn rounded-0"
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
