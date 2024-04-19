import React from "react";
import { SlSocialLinkedin, SlSocialInstagram, SlSocialFacebook, } from "react-icons/sl";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="footer  text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy;{(new Date().getFullYear())} Kuldeep sen. All rights reserved.</p>
          </div>
          <div className="col-md-6 ">
            <ul className="socialMedia d-flex justify-content-end">
              <li>
                <Link to="https://in.linkedin.com/in/kuldeep-sen134" target="_blank" >
                  <SlSocialLinkedin />
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com/officialkdsen134/">
                  <SlSocialInstagram />
                </Link>
              </li>
              <li>
                <Link to="https://www.facebook.com/profile.php?id=100007104191365">
                  <SlSocialFacebook />
                </Link>
              </li>
              <li>
                <Link to="https://x.com/KRtechnical2">
                  <BsTwitterX />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
