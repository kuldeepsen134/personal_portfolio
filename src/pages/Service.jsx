import React from "react";
import service from "../components/service";


const Service = () => {
  
  return (
    <div className="services py-5" id="whatIdo">
      <div className="container">
        <div className="row text-center pt-2 py-4">
          <h2 className="fw-bolder text-white pb-5">How I can help your next project</h2>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {service.map((item, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <div className="card-header">
                  <span className="m-4 text-muted">SERVICES</span>
                </div>
                <div className="card-body"> {/* Use flexbox */}
                  <div className="card-img">
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <h5 className="card-title">{item.title}</h5> {/* Make the title expand */}
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
