import React, { useEffect } from "react";
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
import Footer from "../components/Footer";

const Home = () => {
  const { data } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAbout(""));
  }, [dispatch]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AppHeader />
      <div className="hero-section" id="home">
        <div className="container">
          {data && data.map((user, i) => (
            <div className="row align-items-center vh-100 pt-5" key={i}>
              <div className="col-lg-7 py-5 ps-lg-5">
                <h1>Hi There, I Am {user?.full_name}</h1>
                <p className="fs-3 lh-lg" style={{ color: "#ef7f07" }}>{user?.title}</p>
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn text-white workBtn"
                    onClick={() => scrollToSection("ourWork")}
                  >
                    View my Works
                  </button>
                  <button
                    type="button"
                    className="btn text-white workBtn"
                    onClick={() => scrollToSection("contactMe")}
                  >
                    Contact Me
                  </button>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="avtar-img">
                  <img src={user?.profile} alt="profile" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <About />
      <Service />
      <Project />
      <HireMe />
      <Resume />
      <Skill />
      <ContactUS />
      <Footer />
    </>
  );
};

export default Home;
