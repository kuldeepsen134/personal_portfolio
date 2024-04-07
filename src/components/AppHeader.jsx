import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const [navSize, setnavSize] = useState("5rem");
  const [navColor, setnavColor] = useState("transparent");
  const [isOpen, setIsOpen] = useState(true)
  const [isDefault, setIsDefault] = useState(false)


  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("#252734") : setnavColor("transparent");
    window.scrollY > 10 ? setnavSize("5rem") : setnavSize("5rem");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const scrollToAbout = (id) => {
    const aboutUsSection = document.getElementById(id);
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
      setIsOpen(!isOpen)
    }
  };


  const handleStateWithClick = () => {
    setIsDefault(true)
    setIsOpen(!isOpen)

  }


  return (
    <>
      <nav
        className="navbar fixed-top "
        data-bs-theme="dark"
        style={{
          backgroundColor: navColor,
          height: navSize,
          transition: "all 1s",
        }}
      >
        <div className="container">
          <Link
            className="navbar-brand-name fw-bold "
            to={'/'}
          >
            <span style={{ color: "#ef7f07" }}>K</span>uldeep <span style={{ color: "#ef7f07" }}>S</span>en
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav5"
            aria-controls="navbarNav5"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => handleStateWithClick()}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={!isDefault ? "collapse navbar-collapse" : isOpen ? "collapse navbar-collapse" : "collapse navbar-collapse show"}
            id="navbarNav5">
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => scrollToAbout("home")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#aboutUs"
                  onClick={() => scrollToAbout("aboutUs")}
                >
                  About Me
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#whatIdo"
                  onClick={() => scrollToAbout("whatIdo")}
                >
                  What I Do?
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={() => scrollToAbout("skill-page")}>Resume</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"
                  onClick={() => scrollToAbout("ourWork")}

                >Portfolio</Link>
              </li>

              <li className="nav-item">
                <span className="nav-link">Client Speak</span>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#contactMe"
                  onClick={() => scrollToAbout("contactMe")}
                >
                  Contact Me
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppHeader;
