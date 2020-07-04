import React from "react";
import Base from "../core/Base";
import { emptyOrderSummary } from "../core/helper/orderHelper";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  emptyOrderSummary();

  const UserDashBoardLeft = () => (
    <div className="card bg-dark">
      <h6 className="card-header text-white">User Navigation</h6>
      <h6 className="card-header text-white">Account Setting</h6>

      <ul className="list-group">
        <li className="list-group-item bg-dark">
          <Link to="/user/profile" className="nav-link text-white  ">
            Profile Information
          </Link>
        </li>

        <li className="list-group-item bg-dark">
          <Link to="/user/orders" className="nav-link text-white  ">
            My Orders
          </Link>
        </li>
        <li className="list-group-item bg-dark text-dark">slot4</li>
        <li className="list-group-item bg-dark text-dark">slot5</li>
        <li className="list-group-item bg-dark text-dark">slot6</li>
      </ul>
    </div>
  );

  const UserDashBoardRight = () => {
    return (
      <div className="container-fluid display-4 d-flex justify-content-center text-dark">
        Welcome To User Dashboard
      </div>
    );
  };

  return (
    <Base
      title="User Dashboard"
      description="Place to check your orders, profile and more"
      classNameForTitle="display-4"
      classNameForTopContainer=" bg-white text-dark text-center pt-4"
    >
      <div className="row">
        <div className="col-2 ">{UserDashBoardLeft()}</div>
        <div className="col-10  rounded text-white">{UserDashBoardRight()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
