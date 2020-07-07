import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { ClipLoader } from "react-spinners";
import {
  getCategories,
  deleteCategory,
  updateCategory,
} from "./helper/adminapicall";

export default function ManageProducts() {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const loadingScreen = () => {
    return (
      <div className="row" style={{ height: "300px" }}>
        <div className=" mx-auto my-auto col-1">
          <ClipLoader size={50} color={"#36D7B7"} loading={true} />
        </div>
      </div>
    );
  };

  return (
    <Base title="Welcome admin" description="Manage categories here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row  text-dark mb-5">
        <div className="col-8 offset-2 pt-4 pb-4 pl-5 pr-5 bg-white">
          <h4 className="mb-4">All categories:</h4>
          <h3 className="text-center text-dark my-3">
            Total {categories.length} categories
          </h3>

          {categories.length !== 0
            ? categories.map((category, index) => {
                return (
                  <div key={index} className="row text-center mb-2 text-dark">
                    <div className="col-md-4">
                      <h3 className="text-dark text-left">{category.name}</h3>
                    </div>
                    <div className="col-md-4 mb-2">
                      <Link
                        className="btn btn-success"
                        to={`/admin/category/update/${category._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <button
                        onClick={() => {
                          deleteThisCategory(category._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            : loadingScreen()}
        </div>
      </div>
    </Base>
  );
}
