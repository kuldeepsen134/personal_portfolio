import React from "react";
import service from "../components/service";


const Service = () => {
  return (
    <div className="services" id="whatIdo">
      <div className="container">
        <div className="row text-center pt-2 py-4">
          <h2 className="fw-bolder">How I can help your next project</h2>
        </div>

        <div className="row animate__animated animate__zoomInUp">
          {service.map((item, index) => (
            <div className="col-md-4 mb-2" key={index}>
              <div className="card p-0 mx-2">
                <div className="cardImage">
                  <span className="m-4 text-muted">SERVICES</span>
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "200px" }} // Adjust the height as needed
                  />
                </div>
                <div className="card-body d-flex flex-column"> {/* Use flexbox */}
                  <h5 className="card-title flex-grow-1">{item.title}</h5> {/* Make the title expand */}
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
