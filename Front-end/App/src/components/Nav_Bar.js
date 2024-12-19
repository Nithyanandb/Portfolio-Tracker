import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Home_bottom from './Home_bottom';
import { Bar } from "react-chartjs-2";

function Nav_Bar() {
  return (
    <div className="fly-high">
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container">
          <a className="navbar-brand" href="/">
            Air Traffic Control
          </a>
          <button
            className="navbar-toggler"
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              
              <li className="nav-item">
                <Link className="nav-link" to="/airports">
                  Airports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/planes">
                  Planes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/route">
                  Find Route
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav_Bar;