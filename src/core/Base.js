import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My description",
  className = " body text-white p-4",
  classNameForTitle = "display-4 ",
  classNameForTopContainer = "bg-light text-dark text-center pt-4 pb-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid ">
      <div className={classNameForTopContainer}>
        <h3 className={classNameForTitle}>{title}</h3>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-primary ">
      <div className="container text-center p-1">
        <span className="">
          An Amazing <span className="text-white">STORE</span> for{" "}
          <span className="text-white">YOU</span>
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
