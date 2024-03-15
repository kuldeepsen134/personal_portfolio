import React from "react";
import service from "../components/service";

const Service = () => {
  return (
    <div className="services" id="whatIdo">
      <div className="container">
        <div className="text-center pt-5 py-4">
          <span className="bg-warning fs-4 ">What I Do?</span>
        </div>
        <div className="row text-center">
          <h2 className="fw-bolder">How I can help your next project</h2>
        </div>
        <div className="row mt-4">
          <div className="card-group">
            {service.map((item, i) => {
              return (
                <div className="col-4" key={i}>
                  <div className="card text-center p-4 mx-2">
                    <div className="cardImage ">
                      <img src={item.image} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
