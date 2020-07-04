import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
          console.log("else called");
          console.log(data);
          console.log(data.error);
        }
      })
      .catch(console.log("Error in signup from onSubmit"));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="">
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-dark">Name</label>
                <input
                  onChange={handleChange("name")}
                  type="text"
                  value={name}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-dark">Email</label>
                <input
                  onChange={handleChange("email")}
                  type="email"
                  value={email}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-dark">Password</label>
                <input
                  onChange={handleChange("password")}
                  type="password"
                  value={password}
                  className="form-control form-control-sm"
                />
              </div>
              <button onClick={onSubmit} className="btn btn-success btn-block ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="SignUp" description="A page for user to signup">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
