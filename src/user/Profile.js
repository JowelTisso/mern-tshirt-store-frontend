import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { UserDashBoardLeft } from "./helper/userDashboardHelper";
import { getUserInfo, updateUserInfo } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";

const Profile = () => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const [userInfo, setUserInfo] = useState({});
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    gender: "",
    phone: "",
    photo: "",
    address: "",
    error: "",
    createdProduct: "",
    formData: "",
  });
  const [edit, setEdit] = useState(false);
  const [reload, setReload] = useState(false);

  const {
    name,
    lastname,
    email,
    gender,
    phone,
    address,
    error,
    createdProduct,
    formData,
  } = values;

  const loadUserInfo = () => {
    getUserInfo(userId, token)
      .then((data) => {
        console.log(data);
        setUserInfo({
          ...values,
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          gender: data.gender,
          phone: data.phone,
          address: data.address,
        });
        setValues({
          ...values,
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          gender: data.gender,
          phone: data.phone,
          address: data.address,
          formData: new FormData(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    loadUserInfo();
  }, [reload]);

  const successMessage = () => (
    <div
      className="alert alert-succcess mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} Updated successfully</h4>
    </div>
  );

  const warningMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4> Failed to update the profile</h4>
    </div>
  );

  const onSubmit = (event) => {
    event.preventDefault();
    updateUserInfo(userId, token, values)
      .then((data) => {
        if (data) {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
          setReload(!reload);
          setEdit(!edit);
        } else {
          setValues({ ...values, error: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UserDashBoardRight = () => {
    return (
      <form className="p-3 rounded bg-dark">
        <div className="row ">
          <div className="col-6">Name</div>
          <div className="col-4 p-2 bg-white rounded text-dark">
            {userInfo.name}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">Lastname</div>
          <div className="col-4 p-2 bg-white rounded text-dark ">
            {userInfo.lastname ? userInfo.lastname : <div>lastname</div>}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">Gender</div>
          <div className="col-4 p-2 bg-white rounded text-dark ">
            {userInfo.gender ? userInfo.gender : <div>male/female/other</div>}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">Email</div>
          <div className="col-4 p-2 bg-white rounded text-dark ">
            {userInfo.email}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">Phone</div>
          <div className="col-4 p-2 bg-white rounded text-dark ">
            {userInfo.phone ? userInfo.phone : <div>00000000</div>}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">Address</div>
          <div className="col-4 p-2 bg-white rounded text-dark ">
            {userInfo.address ? userInfo.address : <div>address</div>}
          </div>
        </div>

        {/* <div className="row mt-5">
          <div className="col-6">Profile Picture</div>
          <div className="col-4 p-2 bg-white rounded text-dark ">
            {userInfo.imageUrl ? userInfo.imageUrl : <div>Image</div>}
          </div>
        </div> */}
      </form>
    );
  };

  const UserDashBoardRightEdit = () => {
    return (
      <form className="p-3 rounded bg-dark">
        <div className="row form-group">
          <div className="col-6">Name</div>
          <input
            onChange={handleChange("name")}
            name="name"
            className="form-control col-4 p-2 bg-white rounded text-dark"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="row mt-5 form-group">
          <div className="col-6">Lastname</div>
          <input
            onChange={handleChange("lastname")}
            name="lastname"
            className="form-control col-4 p-2 bg-white rounded text-dark"
            placeholder={userInfo.lastname ? userInfo.lastname : "Lastname"}
            value={lastname}
          />
        </div>
        <div className="row mt-5 form-group">
          <div className="col-6">Gender</div>
          <select
            onChange={handleChange("gender")}
            name="gender"
            className="form-control col-4 p-2 bg-white rounded text-dark"
            placeholder={userInfo.gender ? userInfo.gender : "Gender"}
            value={gender}
          >
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="row mt-5 form-group">
          <div className="col-6">Email</div>
          <input
            onChange={handleChange("email")}
            name="email"
            className="form-control col-4 p-2 bg-white rounded text-dark"
            placeholder={userInfo.email ? userInfo.email : "Email"}
            value={email}
          />
        </div>
        <div className="row mt-5 form-group">
          <div className="col-6">Phone</div>
          <input
            onChange={handleChange("phone")}
            name="phone"
            type="number"
            className="form-control col-4 p-2 bg-white rounded text-dark"
            placeholder={userInfo.phone ? userInfo.phone : "Phone"}
            value={phone}
          />
        </div>
        <div className="row mt-5 form-group">
          <div className="col-6">Address</div>
          <textarea
            onChange={handleChange("address")}
            name="address"
            className="form-control col-4 p-2 bg-white rounded text-dark"
            placeholder={userInfo.address ? userInfo.address : "Address"}
            value={address}
          />
        </div>
        {/* <div className="row mt-5 form-group">
          <div className="col-6">Profile Picture</div>
          <label className="btn btn-block btn-success col-4 rounded">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              // placeholder="choose a file"
            />
          </label>
        </div> */}
      </form>
    );
  };

  return (
    <Base
      title="Profile Page"
      description="Here you can manage your profile information"
      classNameForTitle="display-4"
      classNameForTopContainer=" bg-white text-dark text-center pt-4"
    >
      <div className="row mb-5">
        <div className="col-md-2 mb-2 ">{UserDashBoardLeft()}</div>
        <div className="col-md-10 p-3 bg-secondary rounded text-white ">
          <div className="row">
            <h2 className="col-3 lead font-weight-normal">
              Profile Information
            </h2>

            <div className="col-1 offset-7">
              <button
                className="btn btn-success rounded mb-1"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                {edit ? <div>Cancel</div> : <div>Edit</div>}
              </button>
            </div>
            <div className="col-1 ">
              {edit && (
                <button
                  className="btn btn-success rounded mb-1"
                  onClick={onSubmit}
                >
                  Save
                </button>
              )}
            </div>
          </div>
          {successMessage()}
          {warningMessage()}
          {edit ? UserDashBoardRightEdit() : UserDashBoardRight()}
        </div>
      </div>
    </Base>
  );
};

export default Profile;
