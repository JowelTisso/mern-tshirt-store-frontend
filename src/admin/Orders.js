import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllOrdersAdmin } from "./helper/adminapicall";

export default function AddProduct() {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  getAllOrdersAdmin(userId, token).then((data) => {
    console.log(data);
  });
  return (
    <Base>
      <h1 className="text-white">Manage Orders</h1>
    </Base>
  );
}
