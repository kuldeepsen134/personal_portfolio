import React from "react";
import service from "../components/service";

const Service = () => {
  return (
    <div className="services py-5" id="whatIdo">
      <div className="container">
        <div className="row text-center pt-2 py-4">
          <h2 className="fw-bolder text-white pb-5">
            How I can help your next project
          </h2>
        </div>

        <div className="rs-services style3 pt-110 pb-120 md-pt-75 md-pb-80">
          <div className="container">
            <div className="row justify-content-center">
              {service.map((item, index) => (
                <div className="col-lg-4 col-md-6 mb-3 mb-20" key={index}>
                  <div className="services-item">
                    <div className="services-icon">
                      <div className="image-part">
                        <img className="main-img" src={item.image} alt="" />
                        <img className="hover-img" src={item.image2} alt="" />
                      </div>
                    </div>

                    <div className="services-content">
                      <div className="services-text">
                        <h3 className="title">
                          <a href="software-development.html">{item.title}</a>
                        </h3>
                      </div>
                      <div className="services-desc">
                        <p>{item.description}</p>
                      </div>
                      <div className="serial-number">{item.id}</div>
                    </div>
                  </div>
                </div>
              ))}
       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
