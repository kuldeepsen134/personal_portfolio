import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectList } from "../redux/slice/projectSlice";
import { DNA } from "react-loader-spinner";

const Project = () => {
  const { projectListData: { data }, loading } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectList(""));
  }, [dispatch]);

  return (
    <div className="projects" id="ourWork">
      <div className="container">
        <div className="text-center pt-2 py-4">
          <h2 className="fw-bolder">Some of my most recent projects</h2>
        </div>
        {loading ? (
          <div className="loading text-center">
            <DNA
              visible={true}
              height="100"
              width="80"
              ariaLabel="dna-loading"
              wrapperclassName="dna-wrapper"
              wrapperStyle={{}}
            />
          </div>
        ) : (
          <div className="row animate__animated animate__zoomInUp pb-4">
            {data?.map((item, i) => (
              <div className="col-md-4 p-2" key={i}>
                <div className="card h-100">
                  <div className="cardImage ">
                    {item?.photoes?.map((pic, j) => (
                      <img
                        src={pic}
                        className="card-img-top"
                        alt={item.t}
                        width={100}
                        sizes={100}
                        key={j}
                      />
                    ))}
                  </div>
                  <div className="card-body p-4">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
