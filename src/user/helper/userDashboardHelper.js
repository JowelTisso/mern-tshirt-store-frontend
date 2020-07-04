import React from "react";
import { Link } from "react-router-dom";

export const UserDashBoardLeft = () => (
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
