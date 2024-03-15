import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectList } from "../redux/slice/projectSlice";
import { DNA } from "react-loader-spinner";

const Project = () => {
  const {
    projectListData: { data },
    loading,
  } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectList(""));
  }, [dispatch]);

  return (
    <div className="container">
      {loading ? (
        <div className="loading text-center">
          <DNA
            visible={true}
            height="100"
            width="80"
            ariaLabel="dna-loading"
            wrapperClass="dna-wrapper"
            wrapperStyle={{}}
          />
        </div>
      ) : (
        <div className="row my-4">
          {data?.map((item, i) => (
            <div className="col-4" key={i}>
              <div className="card text-center p-2">
                {item.photoes.map((pic, j) => (
                  <div className="cardImage" key={j}>
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}${pic}`}
                      className="card-img-top"
                      alt={pic}
                      sizes={100}
                      width={100}
                    />
                  </div>
                ))}
                <h5 className="card-title my-4">{item.title}</h5>
                <p className="card-text">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Project;
