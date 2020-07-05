import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card bg-dark">
        <h6 className="card-header text-white">Admin Navigation</h6>

        <ul className="list-group">
          <li className="list-group-item bg-dark">
            <Link to="/admin/create/category" className="nav-link text-white  ">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item bg-dark">
            <Link to="/admin/categories" className="nav-link text-white  ">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item bg-dark">
            <Link to="/admin/create/product" className="nav-link text-white  ">
              Create Product
            </Link>
          </li>
          <li className="list-group-item bg-dark">
            <Link to="/admin/products" className="nav-link text-white  ">
              Manage Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Info</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin Area"
      description="Manage all of your products here"
      className="container-fluid bg-success p-2"
    >
      <div className="row">
        <div className="col-md-2 mb-2">{adminLeftSide()}</div>
        <div className="col-md-10">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
