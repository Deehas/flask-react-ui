// Library imports
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

// Static imports
import logoImage from "../image/Logo.svg";

function Base() {
  return (
    <div className="Home">
      <a className="brand-logo" href="/">
        <img className="logo" src={logoImage} />
        <div className="brand-logo-name">
          <strong> ToDo </strong>{" "}
        </div>
      </a>

      <div className="call-to-action">
        <h1 className="title">
          Achieve all your daily and weekly objectives in timely fashion{" "}
          <FontAwesomeIcon icon={faClock} />
        </h1>
        <h3 className="subtitle">
          {" "}
          <strong>ToDo</strong> makes it easy to create and organize your tasks{" "}
        </h3>
        <a href="/login" className="btn">
          Let’s get started
        </a>
      </div>
    </div>
  );
}

export default Base;
