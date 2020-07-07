import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "user@gmail.com",
    password: "password",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="text-center">
          <PulseLoader size={20} color={"#123abc"} loading={loading} />
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className=" ">
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-dark">Email</label>
                <input
                  onChange={handleChange("email")}
                  value={email}
                  type="email"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-dark">Password</label>
                <input
                  onChange={handleChange("password")}
                  value={password}
                  type="password"
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
    <Base title="Signin" description="A page for user to signin">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <div className="text-dark p-3 bg-white mt-3 mb-5">
        <h6>Test Logins :</h6>
        <h6>Admin : </h6>
        <p>admin@gmail.com</p>
        <p>password</p>
        <h6>User : </h6>
        <p>user@gmail.com</p>
        <p>user123</p>
      </div>
    </Base>
  );
};

export default Signin;
