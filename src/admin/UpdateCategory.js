import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const AddCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="pb-1">
      <Link className="btn btn-sm btn-info" to="/admin/categories">
        Back
      </Link>
    </div>
  );

  //   const preload = (categoryId) => {
  //     getCategory(categoryId)
  //       .then((data) => {
  //         // console.log(data);
  //         // console.log(data.name);
  //         // console.log(match.params);
  //         if (data.error) {
  //           setName({ name });
  //         } else {
  //           setName({
  //             name: data.name,
  //           });
  //           console.log(data.name);
  //           console.log(name);
  //         }
  //       })
  //       .catch();
  //   };

  //   useEffect(() => {
  //     preload(match.params.productId);
  //   }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    updateCategory(match.params.productId, user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setName("");
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successMessage = () => {
    if (success) {
      return <p className="text-success">Category updated successfully</p>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <p className="text-warning">Failed to update category</p>;
    }
  };

  const myCategoryForm = () => (
    <form action="">
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control form-control-sm my-3 "
          autoFocus
          required
          placeholder="For Ex. Summer"
          onChange={handleChange}
          value={name}
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update a category here"
      description="Update category for products"
      className="container bg-info pl-4 pb-3 pr-4 pt-1"
    >
      {goBack()}
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {myCategoryForm()}
          {successMessage()}
          {warningMessage()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
