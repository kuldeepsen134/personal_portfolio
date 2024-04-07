import React from "react";
import {
  SlSocialLinkedin,
  SlSocialInstagram,
  SlSocialFacebook,
} from "react-icons/sl";
import { BsTwitterX } from "react-icons/bs";



const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy;{(new Date().getFullYear())} Kuldeep sen. All rights reserved.</p>
          </div>
    

          <div className="col-md-6 ">
            <ul className="socialMedia d-flex">
              <li>
                <SlSocialLinkedin />
              </li>
              <li>
                <SlSocialInstagram />
              </li>
              <li>
                <SlSocialFacebook />
              </li>
              <li>
                <BsTwitterX />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
