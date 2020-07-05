import React from "react";
const { API } = require("../../backend");

export const getProducts = () => {
  return fetch(`${API}/products?limit=0`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
