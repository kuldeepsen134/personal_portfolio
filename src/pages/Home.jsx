import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { TypeAnimation } from "react-type-animation";
import About from "./About";
import Service from "./Service";
import Resume from "./Resume";
import Skill from "./skills";
import ContactUS from "./ContactUS";
import { useSelector, useDispatch } from "react-redux";
import { userAbout } from "../redux/slice/userSlice";
import Project from "./Project";
import AppHeader from "../components/AppHeader";
import HireMe from "./HireMe";

const Home = () => {
  const {
    userData: { data },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAbout(""));
  }, [dispatch]);
  const scrollToAbout = (id) => {
    const aboutUsSection = document.getElementById(id);
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AppHeader />
      <div className="hero-section" id="home">
        <div className="container">
          {data &&
            data?.map((user, i) => {
              return (
                <div className="row py-5" key={i}>
                  <div className="col-lg-8 py-5 ps-lg-5">
                    <div>
                      <span className="">HI, I'M</span>
                      <span>{user?.full_name}</span>
                      {/* <TypeAnimation
                        className=""
                        sequence={[user.title, 1000, "developer", 1000]}
                        wrapper="span"
                        speed={40}
                        style={{
                          fontSize: "3em",
                          display: "inline-block",
                          marginLeft: "80px",
                        }}
                        repeat={Infinity}
                      /> */}

                      <p className="fs-3 mt-4">{user?.aboutUs}</p>
                    </div>

                    <ul className="d-flex ">
                      <li className="workBtn">
                        <button
                          type="button"
                          className="btn text-white"
                          onClick={() => scrollToAbout("ourWork")}
                        >
                          View my Works
                        </button>
                      </li>
                      <li className="workBtn">
                        <button
                          type="button"
                          className="btn text-white"
                          onClick={() => scrollToAbout("contactMe")}
                        >
                          Contact Me
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4  py-5 ps-lg-5">
                    <Avatar
                      name="avtar"
                      src={`${process.env.REACT_APP_API_BASE_URL}${user?.profile}`}
                      size="300"
                      style={{
                        border: "5px solid white",
                      }}
                      round={true}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <About />
      <Service />
      <Project />
      <HireMe />
      <Resume />
      <Skill />
      <ContactUS />
    </>
  );
};

export default Home;
