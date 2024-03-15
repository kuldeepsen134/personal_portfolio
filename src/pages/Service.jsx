import React from "react";
import service from "../components/service";

const Service = () => {
  return (
    <div className="services">
      <div className="container">
        <div className="text-center pt-5 py-4">
          <span className="bg-warning fs-4 ">What I Do?</span>
        </div>
        <div className="row text-center">
          <h2 className="fw-bolder">How I can help your next project</h2>
        </div>
        <div className="row mt-4">
          <div class="card-group">
            {service.map((item, i) => {
              return (
                <div className="col-4">
                  <div class="card text-center p-4 mx-2">
                    <div className="cardImage ">
                      <img src={item.image} class="card-img-top" alt="..." />
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">{item.title}</h5>
                      <p class="card-text">{item.description}</p>
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
