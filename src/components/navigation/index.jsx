import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Profile from '../Profile';
import "./index.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [allValues, setValues] = useState({});

  const profile = async () => {
    const api = "https://apis.ccbp.in/profile";
    const token = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();
      setValues(data.profile_details || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profile();
  }, []);

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      {/* Logo */}
      <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
        <img src={logo} width="50" alt="Logo" />
        <h3 className="m-0">JOBBY</h3>
      </Link>

      {/* Toggler for mobile */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Menu */}
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto w-100 align-items-center gap-3">
          <div className="d-flex justify-content-center gap-5 w-100">
            <li className="nav-item">
              <Link to="/" className="nav-link fs-4">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/job" className="nav-link fs-4">Jobs</Link>
            </li>
          </div>
          
          {/* Profile Dropdown */}
          <li className="nav-item dropdown">
            <button className="btn dropdown-toggle d-flex align-items-center" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ background: "transparent", border: "none" }} >
              <img src={allValues.profile_image_url} width="40" alt="Profile" className="rounded-circle" />
              <span className="ms-2 fs-5">Me</span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end p-3 shadow bg-dark profile-card-nav" >
                <Profile />
                <hr className="text-light fs-5" />
                {Cookies.get('jwt_token') && (
                  <button onClick={onLogout} className="btn btn-danger w-100 fw-semibold" >
                    Logout
                  </button>
                )}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
